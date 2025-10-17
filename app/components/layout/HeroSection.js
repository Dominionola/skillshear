import Link from "next/link";
import Image from "next/image";
// import React, {useState} from "react";

export default function HeroSection() {
  // const [heartOpen, setHeartOpen] = useState(false);

  return (
    <section className="hero-section  bg-no-repeat bg-center bg-white-100 h-80vh">
      <div className="flex flex-col md:flex-row  mx-auto text-center  max-w-7xl p-8 pt-20 md:pt-25 gap-8 md:gap-16 items-center justify-center">
        <div className=" justify-center items-center flex flex-col md:items-start md:text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-sans text-center">
            Empowering Your{" "}
            <span className="text-blue-500 font-serif italic font-medium font-swash text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              Growth
            </span>{" "}
            with Shared{" "}
            <span className="text-blue-500 font-serif italic font-medium font-swash text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              Expertise
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Connect with learners and experts worldwide. Share your knowledge,
            discover new skills, and grow together in our vibrant learning
            community.
          </p>
          <div className="flex gap-5  w-full md:flex-row md:gap-4 md:text-center items-center justify-center ">
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
                className="ml-2 rounded-xl"
              />
            </Link>

            <Link
              href="/auth/signup"
              className="mt-6 inline-flex items-center  justify-center md:max-w-60 bg-white border border-gray-400 text-black px-6 py-3 rounded-3xl text-lg font-medium transition-colors"
            >
              <span>View All Skills</span>
            </Link>
          </div>

          <div className="text-center w-full">
            <ul className="flex -space-x-3 mt-8 text-center items-center justify-center group">
              <li className="inline-block rounded-full overflow-hidden w-7 h-7 align-middle border-2 border-white">
                <Image
                  src="/assets/4thWO.jpg"
                  alt="users"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </li>
              <li className="inline-block rounded-full overflow-hidden w-7 h-7 align-middle border-2 border-white">
                <Image
                  src="/assets/3rdWO.jpg"
                  alt="users"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </li>
              <li className="inline-block rounded-full overflow-hidden w-7 h-7 align-middle border-2 border-white">
                <Image
                  src="/assets/2ndWO.jpg"
                  alt="users"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </li>
              <li className="inline-block rounded-full overflow-hidden w-7 h-7 align-middle border-2 border-white">
                <Image
                  src="/assets/1stWO.jpg"
                  alt="users"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </li>

              <div className="relative flex flex-col items-center pl-5">
                <span className="absolute -top-4 left-1/4 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 group-hover:custom-heart-rise">
                  <Image
                    src="/icons/heart.svg"
                    alt="Heart icon"
                    width={16}
                    height={16}
                    className="inline-block rotate-[-12deg] "
                  />
                  <Image
                    src="/icons/heart.svg"
                    alt="Heart icon"
                    width={16}
                    height={16}
                    className="inline-block mb-1 -mt-2 rotate-12"
                  />
                </span>
                <span className="text-sm text-gray-700">
                  Loved by over 1,000 learners worldwide
                </span>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 mx-auto rounded-3xl overflow-hidden w-[1000px] max-w-full">
        {/* inner padded wrapper keeps padding inside the rounded container and also clips content */}
        <div className="p-4 md:p-6 bg-transparent overflow-hidden rounded-3xl">
          <Image
            src="/assets/hero.png"
            alt="Hero Image"
            width={900}
            height={400}
            className="w-full h-auto block rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
