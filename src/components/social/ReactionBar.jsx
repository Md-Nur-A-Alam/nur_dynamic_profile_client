"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { triggerConfetti } from "@/lib/confetti";
import { Button } from "@/components/ui/Button";

const REACTION_EMOJIS = {
  like: "👍",
  love: "❤️",
  haha: "😂",
  wow: "😲",
  sad: "😢",
  angry: "😡"
};

export function ReactionBar({ postId }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [showGate, setShowGate] = useState(false);

  // Fetch reactions
  const { data: reactions = [] } = useQuery({
    queryKey: ['reactions', postId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000'}/api/social/posts/${postId}/reactions`);
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || [];
    }
  });

  // Toggle reaction mutation
  const toggleReaction = useMutation({
    mutationFn: async (type) => {
      // If same type, it's a delete (unlike). Otherwise, it's a create/update.
      const existing = reactions.find(r => r.userId === session?.user?.id);
      
      if (existing && existing.type === type) {
        // Remove
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000'}/api/social/posts/${postId}/reactions`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to remove reaction');
        return null;
      } else {
        // Create/Update
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000'}/api/social/reactions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, type })
        });
        if (!res.ok) throw new Error('Failed to set reaction');
        const json = await res.json();
        return json.data;
      }
    },
    onMutate: async (newType) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['reactions', postId] });
      
      const previousReactions = queryClient.getQueryData(['reactions', postId]);
      const existing = previousReactions?.find(r => r.userId === session?.user?.id);
      const isRemoval = existing && existing.type === newType;

      // Optimistically update
      queryClient.setQueryData(['reactions', postId], (old) => {
        const others = (old || []).filter(r => r.userId !== session?.user?.id);
        if (isRemoval) return others;
        return [...others, { _id: 'temp_id', postId, userId: session.user.id, type: newType }];
      });

      if (!isRemoval) {
        triggerConfetti();
      }

      return { previousReactions };
    },
    onError: (err, newType, context) => {
      // Revert if error
      if (context?.previousReactions) {
        queryClient.setQueryData(['reactions', postId], context.previousReactions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['reactions', postId] });
    }
  });

  const handleReactionClick = (type) => {
    if (!session) {
      setShowGate(true);
      return;
    }
    toggleReaction.mutate(type);
  };

  const userReaction = reactions.find(r => r.userId === session?.user?.id);
  
  // Aggregate counts
  const counts = reactions.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(REACTION_EMOJIS).map(([type, emoji]) => {
          const count = counts[type] || 0;
          const isActive = userReaction?.type === type;
          
          return (
            <Button 
              key={type}
              variant={isActive ? "primary" : "outline"}
              onClick={() => handleReactionClick(type)}
              className={`rounded-full px-4 py-1.5 h-auto text-sm ${isActive ? 'bg-accent-accepted text-bg-base border-accent-accepted hover:bg-accent-accepted/90' : 'hover:border-accent-accepted hover:text-accent-accepted transition-colors'}`}
              aria-label={`React with ${type}`}
            >
              <span className="mr-2 text-base">{emoji}</span>
              <span className="font-mono">{count}</span>
            </Button>
          );
        })}
      </div>

      {showGate && !session && (
        <div 
          className="mt-4 p-3 bg-surface-raised border border-accent-pending rounded-lg text-sm font-mono text-accent-pending animate-in fade-in slide-in-from-top-2"
          role="alert"
          aria-live="assertive"
          tabIndex="-1"
          ref={el => el && el.focus()}
        >
          To do like and comment, please login first.
        </div>
      )}
    </div>
  );
}
