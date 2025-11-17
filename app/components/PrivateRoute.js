"use client";

import { UserAuth } from "../context/ContextAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PrivateRoute({ children }) {
  const { session } = UserAuth();
  const router = useRouter();

  // wait for context to finish loading session
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // session === undefined → still loading Supabase session
    if (session === undefined) {
      setIsChecking(true);
      return;
    }

    // session finished loading → stop loading screen
    setIsChecking(false);

    // no user → redirect
    if (!session) {
      router.replace("/auth/signup");
    }
  }, [session, router]);

  // Show loading screen until session resolves
  if (isChecking) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Image
          src="/logo.png"
          alt="Loading..."
          width={80}
          height={80}
          className="animate-spin"
        />
      </div>
    );
  }

  // If user is not signed in, don't render dashboard
  if (!session) return null;

  return <>{children}</>;
}
