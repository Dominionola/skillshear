"use client";

import { useState } from "react";
import Image from "next/image";

export default function SignupPlaceholderForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col text-sm text-black">
            First name
            <input
              className="mt-2 px-4 py-3 rounded-lg border border-gray-300 bg-transparent text-black placeholder:text-black"
              placeholder="First name"
            />
          </label>

          <label className="flex flex-col text-sm text-black">
            Last name
            <input
              className="mt-2 px-4 py-3 rounded-lg border border-gray-300 bg-transparent text-black placeholder:text-black"
              placeholder="Last name"
            />
          </label>
        </div>

        <label className="flex flex-col text-sm text-black">
          Email
          <input
            type="email"
            className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent text-black placeholder:text-black"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col text-sm text-black relative">
          Password
          <div className="mt-2 relative">
            <input
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

        <label className="flex flex-col text-sm text-black">
          Country
          <select className="mt-2 px-4 py-3 rounded-lg border border-gray-300 bg-transparent text-black">
            <option>Nigeria</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </label>

        <div className="pt-2">
          <button
            type="Submit"
            className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-black font-medium py-3 px-4 rounded-full"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
