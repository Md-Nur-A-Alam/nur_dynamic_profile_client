"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.profileImage || undefined,
        additionalFields: {
          occupation: formData.occupation,
        },
      });
      
      if (error) {
        setError(error.message || "Failed to register");
      } else {
        router.push("/posts");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/posts",
      });
      if (error) setError(error.message);
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-display font-bold text-text-primary">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            Or{" "}
            <Link href="/login" className="font-medium text-accent-accepted hover:text-accent-pending transition-colors">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-surface-raised py-8 px-4 border border-border-subtle rounded-xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary">Name</label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-base text-text-primary focus:outline-none focus:ring-accent-accepted focus:border-accent-accepted sm:text-sm"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary">Email address</label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-base text-text-primary focus:outline-none focus:ring-accent-accepted focus:border-accent-accepted sm:text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary">Password</label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-base text-text-primary focus:outline-none focus:ring-accent-accepted focus:border-accent-accepted sm:text-sm"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-text-primary">Occupation (Optional)</label>
                <div className="mt-1">
                  <input
                    id="occupation"
                    name="occupation"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-base text-text-primary focus:outline-none focus:ring-accent-accepted focus:border-accent-accepted sm:text-sm"
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium text-text-primary">Profile Image URL (Optional)</label>
                <div className="mt-1">
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="url"
                    className="appearance-none block w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-base text-text-primary focus:outline-none focus:ring-accent-accepted focus:border-accent-accepted sm:text-sm"
                    value={formData.profileImage}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && (
                <div className="text-accent-wrong text-sm font-mono mt-2" role="alert">
                  {error}
                </div>
              )}

              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-subtle" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface-raised text-text-muted">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="secondary" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
