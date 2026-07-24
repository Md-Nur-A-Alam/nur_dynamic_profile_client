"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Uploader } from "@/components/shared/Uploader";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        occupation: session.user.occupation || "",
        profileImage: session.user.image || "",
      });
    }
  }, [session]);

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center font-mono">Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, profileImage: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      const { data, error } = await authClient.updateUser({
        name: formData.name,
        image: formData.profileImage || undefined,
        // Since occupation is an additional field, we pass it under additionalFields? No, better auth client merges it or wait...
        // Let's pass it at root if that's how it works or additionalFields? Wait, in register we used `additionalFields`, wait, no, `updateUser` might take it natively or in `additionalFields`. Wait! Let me check the documentation or just pass it in. If it fails, I'll update it. Usually, `additionalFields` is only for `signUp.email`, while `updateUser` updates the user table directly. Let's try passing it directly as it's merged into the schema, or maybe under `additionalFields: { occupation }` like signUp. Actually, according to Better Auth docs, when you add custom fields using `additionalFields`, they become top-level properties on the user object for both read and write. Wait, no. I should check how `updateUser` works. I will use `authClient.updateUser` with it at the top level, but wait, BetterAuth typing usually merges it. 
        occupation: formData.occupation
      });
      
      if (error) {
        setMessage({ type: "error", text: error.message || "Failed to update profile" });
      } else {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-bg-base py-12 px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="max-w-3xl mx-auto">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-text-primary">
              Your Profile
            </h1>
            <Button variant="outline" onClick={handleLogout} className="mt-4 md:mt-0">
              Sign out
            </Button>
          </div>

          <div className="bg-surface-raised border border-border-subtle rounded-xl p-6 md:p-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="h-24 w-24 rounded-full bg-border-subtle overflow-hidden flex-shrink-0">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-text-muted bg-surface-raised">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">{session.user.name}</h2>
                <p className="text-text-muted">{session.user.email}</p>
                <div className="mt-2 text-xs font-mono px-2 py-1 bg-border-subtle inline-block rounded text-text-primary uppercase">
                  Role: {session.user.role || 'user'}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-base text-text-primary focus:outline-none focus:ring-accent-accepted sm:text-sm"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary">Email</label>
                  <input
                    type="text"
                    disabled
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-border-subtle rounded-md bg-surface-raised text-text-muted sm:text-sm cursor-not-allowed"
                    value={session.user.email}
                  />
                  <p className="mt-1 text-xs text-text-muted">Email cannot be changed.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary">Occupation</label>
                  <input
                    name="occupation"
                    type="text"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-base text-text-primary focus:outline-none focus:ring-accent-accepted sm:text-sm"
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary">Profile Image</label>
                  <div className="mt-1 flex flex-col gap-4">
                    {formData.profileImage && (
                      <div className="h-16 w-16 rounded-full overflow-hidden border border-border-subtle shrink-0">
                        <img src={formData.profileImage} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                    <Uploader fileType="image" onUploadSuccess={handleImageUpload} />
                  </div>
                </div>
              </div>

              {message.text && (
                <div 
                  className={`text-sm font-mono p-3 rounded ${message.type === 'error' ? 'bg-accent-wrong/10 text-accent-wrong' : 'bg-accent-accepted/10 text-accent-accepted'}`}
                  role="alert"
                >
                  {message.text}
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-border-subtle">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
