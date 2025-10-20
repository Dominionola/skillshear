"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function MotionHeroImage() {
  const reduce = useReducedMotion();
  const variants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { y: 0, opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial={reduce ? "visible" : "hidden"}
      animate="visible"
      variants={variants}
      transition={{ duration: 0.9, ease: [0.22, 0.9, 0.35, 1] }}
      className="rounded-3xl"
    >
      <Image
        src="/assets/hero.png"
        alt="Hero Image"
        width={900}
        height={400}
        className="w-full h-auto block rounded-3xl"
      />
    </motion.div>
  );
}
