"use client";
import Image from "next/image";

export default function MotionCircle() {
  return (
    <div
      className="w-full max-w-7xl h-full flex justify-center items-center mx-auto cta-spin"
      style={{ transformOrigin: "50% 50%" }}
    >
      <Image
        src="/assets/circle.svg"
        alt=""
        unoptimized
        width={900}
        height={300}
        className="object-center object-cover"
      />
    </div>
  );
}
