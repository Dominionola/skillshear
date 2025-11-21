"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ContextAuthProvider, UserAuth } from "@/app/context/ContextAuth";
import Link from "next/link";


export default function SignupPlaceholderForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { session, signUpNewUser, signInUser, signout, signInWithGoogle } = UserAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      setLoading(false);
      return;
    }

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    // Basic sanitization (trimming)
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();

    // Regex for name validation (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(cleanFirstName) || !nameRegex.test(cleanLastName)) {
      setError("Names can only contain letters, spaces, hyphens, and apostrophes.");
      setLoading(false);
      return;
    }

    try {
      const result = await signUpNewUser(cleanEmail, password, cleanFirstName, cleanLastName);
      if (result.success) {
        router.push("/auth/confirm-email");
      } else {
        if (result.error?.message === "User already registered") {
          setError(
            <span>
              This email is already registered. Please{" "}
              <Link href="/auth/login" className="underline hover:text-blue-700">
                Sign In
              </Link>{" "}
              instead.
            </span>
          );
        } else {
          setError(result.error?.message || "An error occurred during signup.");
        }
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
          className="flex items-center justify-center gap-3 w-full md:w-auto px-6 py-2.5 border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors"
        >
          <Image
            src="/icons/apple.svg"
            alt="Apple"
            width={20}
            height={20}
          />
          <span className="text-black font-medium">Continue with Apple</span>
        </button>

        <button
          type="button"
          onClick={signInWithGoogle}
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

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col text-sm text-black">
            First name
            <input
              onChange={(e) => setFirstName
                (e.target.value)}
              className="mt-2 px-4 py-3 rounded-lg border border-gray-300 bg-transparent text-black placeholder:text-black"
              placeholder="First name"
            />
          </label>

          <label className="flex flex-col text-sm text-black">
            Last name
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 px-4 py-3 rounded-lg border border-gray-300 bg-transparent text-black placeholder:text-black"
              placeholder="Last name"
            />
          </label>
        </div>

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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="mt-4 text-black text-center " >Already have an account? <Link className="text-blue-600 hover:text-blue-700 underline" href="/auth/login">Login</Link></p>
          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
