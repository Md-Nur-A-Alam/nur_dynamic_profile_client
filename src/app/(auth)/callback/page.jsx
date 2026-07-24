"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Reveal } from "@/components/ui/Reveal";

export default function AuthCallback() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (session?.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/posts");
      }
    }
  }, [session, isPending, router]);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-display font-bold text-text-primary animate-pulse">
            Authenticating...
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Please wait while we redirect you.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
