"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ContextAuthProvider, UserAuth } from "@/app/context/ContextAuth";
import Link from "next/link";


export default function SigninPlaceholderForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (errorParam === 'account_not_found') {
      setError("Account not found. Please Sign Up to create an account.");
    }
  }, [errorParam]);

  const { session, signInUser, signInWithGoogle, signInWithGitHub } = UserAuth();
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center items-center">
        <button
          type="button"
          onClick={() => signInWithGitHub({ queryParams: { intent: 'login' } })}
          className="flex items-center justify-center gap-3 w-full md:w-auto px-6 py-2.5 border border-gray-700 rounded-full bg-[#24292e] hover:bg-[#1b1f23] transition-colors"
        >
          <Image
            src="/icons/github.svg"
            alt="GitHub"
            width={20}
            height={20}
          />
          <span className="text-white font-medium">Continue with GitHub</span>
        </button>

        <button
          type="button"
          onClick={() => signInWithGoogle({ queryParams: { intent: 'login' } })}
          className="flex items-center justify-between gap-3 w-full md:w-auto pl-4 pr-1 py-1.5 bg-[#1a73e8] hover:bg-[#1557b0] rounded-full transition-colors group"
        >
          <span className="text-white font-medium ml-2">Continue with Google</span>
          <div className="bg-white p-1.5 rounded-full flex items-center justify-center">
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={18}
              height={18}
            />
          </div>
        </button>
      </div>

      <form onSubmit={handleSignin} className="space-y-4">
        <label className="flex flex-col text-sm text-black">
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent text-black placeholder:text-black"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col text-sm text-black relative">
          Password
          <div className="mt-2 relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent text-black placeholder:text-black"
              placeholder="Password (8 or more characters)"
            />

            <button
              type="button"
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Image
                src={showPassword ? "/icons/eye-slash.svg" : "/icons/eye.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                width={24}
                height={24}
              />
            </button>
          </div>
        </label>

        <div className="pt-2">
          <button
            type="Submit"
            className="w-full md:w-1/2 mx-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-gray-600 text-sm">Don't have an account?</p>
            <Link
              href="/auth/signup"
              className="w-full md:w-1/2 flex items-center justify-center px-4 py-2.5 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
