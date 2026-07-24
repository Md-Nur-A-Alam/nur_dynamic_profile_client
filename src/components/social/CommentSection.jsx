"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { triggerConfetti } from "@/lib/confetti";
import { Button } from "@/components/ui/Button";
import { formatDistanceToNow } from "date-fns";

export function CommentSection({ postId }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const [showGate, setShowGate] = useState(false);

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000'}/api/social/posts/${postId}/comments`);
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || [];
    }
  });

  // Submit comment mutation
  const submitComment = useMutation({
    mutationFn: async (text) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000'}/api/social/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, text })
      });
      if (!res.ok) throw new Error('Failed to post comment');
      const json = await res.json();
      return json.data;
    },
    onMutate: async (newText) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });
      const previousComments = queryClient.getQueryData(['comments', postId]);

      // Optimistic update
      queryClient.setQueryData(['comments', postId], (old) => {
        return [...(old || []), { 
          _id: `temp_${Date.now()}`, 
          postId, 
          userId: session.user.id,
          // Since we don't have the full user object, we approximate it for the UI until refetch
          user: { name: session.user.name, image: session.user.image },
          text: newText,
          createdAt: new Date().toISOString()
        }];
      });

      setCommentText(""); // clear input
      triggerConfetti();

      return { previousComments };
    },
    onError: (err, newText, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', postId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session) {
      setShowGate(true);
      return;
    }
    if (!commentText.trim()) return;
    
    submitComment.mutate(commentText);
  };

  const handleInputFocus = () => {
    if (!session) {
      setShowGate(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <div className="bg-surface-raised border border-border-subtle rounded-xl p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4 font-display">Add a comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full bg-bg-base border border-border-subtle rounded-lg p-3 text-text-primary focus:outline-none focus:ring-accent-accepted focus:border-accent-accepted min-h-[100px] resize-y"
            placeholder="What are your thoughts?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onFocus={handleInputFocus}
          />
          
          <div className="flex justify-between items-center">
            <div className="flex-1">
              {showGate && !session && (
                <div 
                  className="p-2 bg-surface-raised border border-accent-pending rounded-lg text-sm font-mono text-accent-pending animate-in fade-in slide-in-from-left-2 inline-block"
                  role="alert"
                  aria-live="assertive"
                  tabIndex="-1"
                  ref={el => el && el.focus()}
                >
                  To do like and comment, please login first.
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              disabled={submitComment.isPending || (session && !commentText.trim())}
              className="ml-4"
            >
              {submitComment.isPending ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-text-primary font-display border-b border-border-subtle pb-2">
          {comments.length} Comments
        </h3>
        
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-border-subtle overflow-hidden flex-shrink-0">
              {comment.user?.image ? (
                <img src={comment.user.image} alt={comment.user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-text-muted bg-surface-raised">
                  {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
            
            <div className="flex-1 bg-surface-raised border border-border-subtle rounded-lg rounded-tl-none p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-text-primary">{comment.user?.name || 'Unknown User'}</span>
                <span className="text-xs text-text-muted font-mono">
                  {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : ''}
                </span>
              </div>
              <p className="text-text-primary whitespace-pre-wrap leading-relaxed">
                {comment.text}
              </p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8 text-text-muted italic">
            No comments yet. Be the first to start the discussion!
          </div>
        )}
      </div>
    </div>
  );
}
