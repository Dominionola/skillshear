import Link from "next/link";
import Image from "next/image";

export default function CallToAction() {
  return (
    <div className="relative rounded-2xl overflow-hidden w-full">

      {/* centered background image constrained to max-w-7xl so it doesn't change CTA size */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-full max-w-7xl h-full">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/d5e2d72a033944e1a916c5c34902a1ff/d06cb337b4bd44549a3ed6c676f2c8c0?width=1811"
            alt="background"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl md:text-2xl font-semibold">Join Our Community</h2>
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
