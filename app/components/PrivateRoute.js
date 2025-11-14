"use client";

import { UserAuth } from "../context/ContextAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function PrivateRouter({ children }) {
  const { session } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    // 🚨 session === undefined → still loading Supabase
    if (session === undefined) return;

    // ❌ no session → redirect
    if (session === null) {
      router.push("/auth/signup");
    }
  }, [session, router]);

  // 🔵 Loading screen while supabase is still loading session
  if (session === undefined) {
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

  // ✔ Logged in → render page
  return <>{children}</>;
}
