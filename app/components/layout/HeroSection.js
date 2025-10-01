import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-section max-w-7xl mx-auto text-center">
      <div className="">
        <h1 className="text-4xl font-bold font-sans">
          Empowering Your{" "}
          <span className="text-blue-500 font-serif italic font-medium font-swash text-5xl tracking-tighter">
            Growth
          </span>{" "}
          with Shared{" "}
          <span className="text-blue-500 font-serif italic font-medium font-swash text-5xl tracking-tighter">
            Expertiese
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600e">
          Connect with learners and experts worldwide. Share your knowledge,
          discover new skills, and grow together in our vibrant learning
          community.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-3xl text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <span>Explore Now</span>
            <Image
              src="/icons/arrow-right.svg"
              alt="Arrow icon"
              width={16}
              height={16}
              className="ml-2"
            />
          </Link>

           <Link
            href="/signup"
            className="mt-6 inline-flex items-center bg-white border-1 border-gray-400 text-black px-6 py-3 rounded-3xl text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <span>Explore Now</span>
           
          </Link>
        </div>
      </div>
    </section>
  );
}
