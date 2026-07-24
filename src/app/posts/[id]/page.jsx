import Link from "next/link";
import { format } from "date-fns";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ReactionBar } from "@/components/social/ReactionBar";
import { CommentSection } from "@/components/social/CommentSection";

async function fetchPost(id) {
  try {
    const baseUrl = process.env.SERVER_BASE_URL || 'http://localhost:8000';
    const res = await fetch(`${baseUrl}/api/social/posts/${id}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await fetchPost(id);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-mono text-accent-wrong mb-4">404 - Post Not Found</h1>
        <Link href="/posts">
          <Button variant="outline">
            <FaCircleArrowLeft className="mr-2" size={16} /> Return to feed
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <Reveal>
          <Link href="/posts">
            <Button variant="ghost" className="mb-8 font-mono text-sm pl-0 hover:bg-transparent">
              <FaCircleArrowLeft className="mr-2" size={16} /> // back to feed
            </Button>
          </Link>

          <article className="bg-surface-raised border border-border-subtle rounded-xl overflow-hidden p-6 md:p-8 mb-8">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-mono">
                <time>{format(new Date(post.createdAt || Date.now()), 'MMMM dd, yyyy')}</time>
                {post.location && <span>📍 {post.location}</span>}
                {post.feeling && <span>Feeling {post.feeling}</span>}
              </div>
            </header>

            <div className="text-text-primary leading-relaxed whitespace-pre-line text-lg mb-8">
              {post.description}
            </div>

            {post.attachmentImages && post.attachmentImages.length > 0 && (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-8">
                {post.attachmentImages.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt={`Attachment ${i+1}`} 
                    className="rounded-lg w-full h-auto object-cover border border-border-subtle" 
                  />
                ))}
              </div>
            )}

            <div className="pt-6 border-t border-border-subtle">
              {/* Client Component for Reactions */}
              <ReactionBar postId={post._id} initialReactions={[]} />
            </div>
          </article>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Discussion</h2>
            {/* Client Component for Comments */}
            <CommentSection postId={post._id} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
