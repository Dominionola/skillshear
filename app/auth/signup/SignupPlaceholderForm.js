"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ContextAuthProvider, UserAuth } from "@/app/context/ContextAuth";


export default function SignupPlaceholderForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const router = useRouter();

const { session, signUpNewUser, signInUser, signout, signInWithGoogle } = UserAuth();
  console.log("Current session:", session);
  console.log(email, password)
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const result = await signUpNewUser(email, password);
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
<div className="mb-3">
        <button onClick={signInWithGoogle}
        className="bg-blue-500 py-2 px-3 text-white rounded-xl ">countinue with google</button>
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
            className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-black font-medium py-3 px-4 rounded-full"
          >
            Create account
          </button>

          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
