import Link from "next/link";
import Image from "next/image";

export default function CallToAction() {
  return (
    <div className="relative rounded-2xl overflow-hidden w-full min-h-[220px] md:min-h-[320px]">
      {/* centered background image constrained to max-w-7xl so it doesn't change CTA size */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-full max-w-7xl h-full flex justify-center items-center mx-auto">
          <Image
            src="/assets/circle.svg"
            alt=""
            unoptimized
            width={900}
            height={300}
            className="object-center object-cover "
          />
        </div>
      </div>

      {/* overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
        <div className="flex-1 min-w-0">
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
