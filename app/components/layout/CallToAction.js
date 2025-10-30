"use client";
import Link from "next/link";
import Image from "next/image";
import MotionCircle from "./MotionCircle";

export default function CallToAction() {
  return (
    <div className="relative overflow-hidden w-full min-h-[400px] md:min-h-[520px]">
      {/* centered background image constrained to max-w-7xl so it doesn't change CTA size */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
        <MotionCircle />
      </div>

      {/* overlay using user-provided gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(142deg, #1e40af 18.68%, #3E1BC9 78.25%)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col  items-center justify-between gap-6 text-white">
        <div className="flex flex-col min-w-0 text-center\\">
          <h2 className="text-xl md:text-2xl font-semibold">
            Join Our Community
          </h2>
          <p className="text-sm md:text-base text-white/90 mt-2">
            Connect with like-minded individuals and enhance your skills.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/join"
            className="inline-block bg-white text-blue-600 font-medium py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
