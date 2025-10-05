import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-section bg-gray-200">
      <div className="flex flex-col md:flex-row mx-auto text-center max-w-7xl p-8 md:p-16 gap-8 md:gap-16 items-center justify-center">
        <div className=" justify-center items-center flex flex-col md:items-start md:text-left max-w-2xl">
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
          <p className="mt-4 text-lg text-gray-600">
            Connect with learners and experts worldwide. Share your knowledge,
            discover new skills, and grow together in our vibrant learning
            community.
          </p>
          <div className="flex flex-col md:flex-row md:gap-4 items-center justify-center ">
            <Link
              href="/auth/signup"
              className="mt-6 inline-flex items-center justify-center md:max-w-90 bg-blue-600 text-white px-6 py-3 rounded-3xl text-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Explore Now</span>
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow icon"
                width={16}
                height={16}
                className="ml-2"
              />
            </Link>

            <Link
              href="/auth/signup"
              className="mt-6 inline-flex items-center w-full justify-center md:max-w-60 bg-white border border-gray-400 text-black px-6 py-3 rounded-3xl text-lg font-medium transition-colors"
            >
              <span>View All Skills</span>
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/assets/hero-img.png"
            alt="Hero Image"
            width={800}
            height={400}
            className="mt-8 mx-auto"
          />
        </div>
      </div>
      <div></div>
    </section>
  );
}
