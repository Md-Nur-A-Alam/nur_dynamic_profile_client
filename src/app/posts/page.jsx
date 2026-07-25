import Link from "next/link";
import { format } from "date-fns";
import { Reveal } from "@/components/ui/Reveal";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { ReactionBar } from "@/components/social/ReactionBar";
import { CommentSection } from "@/components/social/CommentSection";

async function fetchPosts() {
  try {
    const baseUrl = process.env.SERVER_BASE_URL;
    const res = await fetch(`${baseUrl}/api/social/posts`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || json; // Handle both wrapped and unwrapped array
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export default async function PostsPage() {
  const posts = await fetchPosts();

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <Reveal>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary leading-tight">
              Thoughts & Updates
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Recent reflections, project updates, and miscellaneous ideas.
            </p>
          </div>
          
          <div className="space-y-8">
            {posts && posts.length > 0 ? (
              posts.map((post, idx) => (
                <Reveal key={post._id} delay={idx * 0.1}>
                  {/* Note: using rounded-xl and warmer surface colors here per design guidelines */}
                  <Card className="rounded-xl bg-surface-raised border border-border-subtle overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl font-bold text-text-primary hover:text-accent-accepted transition-colors">
                          <Link href={`/posts/${post._id}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        <div className="text-sm text-text-muted font-mono shrink-0 ml-4">
                          {format(new Date(post.createdAt || Date.now()), "EEEE, MMM dd, yyyy 'at' hh:mm:ss a")}
                        </div>
                      </div>
                      {post.location && (
                        <div className="text-sm text-text-muted mt-1">
                          📍 {post.location}
                        </div>
                      )}
                      {post.feeling && (
                        <div className="text-sm text-text-muted mt-1">
                          Feeling {post.feeling}
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-text-primary whitespace-pre-line leading-relaxed">
                        {post.description}
                      </p>
                      
                      {post.attachmentImages && post.attachmentImages.length > 0 && (
                        <div className="mt-6 grid gap-2 grid-cols-2">
                          {post.attachmentImages.map((img, i) => (
                            <img 
                              key={i} 
                              src={img} 
                              alt={`Attachment ${i+1}`} 
                              className="rounded-lg object-cover w-full h-48 border border-border-subtle" 
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="flex-col items-stretch gap-4 pt-4 border-t border-border-subtle bg-bg-base/50">
                      <ReactionBar postId={post._id} initialReactions={[]} />
                      <div className="mt-2 text-sm text-text-muted">
                        <Link href={`/posts/${post._id}`} className="hover:text-accent-accepted font-medium transition-colors">
                          View discussion →
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </Reveal>
              ))
            ) : (
              <div className="text-center py-12 text-text-muted border border-border-subtle rounded-xl bg-surface-raised">
                No posts found.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
