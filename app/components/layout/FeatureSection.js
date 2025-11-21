"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FeatureSection() {
  const features = [
    {
      icon: "/icons/share-white.svg",
      iconHover: "/icons/share.svg",
      title: "Share Your Skills",
      desc: "Create engaging posts to share your expertise, tutorials, and knowledge with a global community of learners.",
    },
    {
      icon: "/icons/connect-white.svg",
      iconHover: "/icons/connect.svg",
      title: "Connect & Collaborate",
      desc: "Build meaningful connections with like-minded individuals and collaborate on projects that matter to you.",
    },
    {
      icon: "/icons/discover-white.svg",
      iconHover: "/icons/discover.svg",
      title: "Discover Resources",
      desc: "Find exactly what you're looking for with powerful search and filtering tools across all shared content.",
    },
    {
      icon: "/icons/bookmark-white.svg",
      iconHover: "/icons/bookmark.svg",
      title: "Save & Organize",
      desc: "Bookmark valuable content and organize your learning materials for easy access whenever you need them.",
    },
    {
      icon: "/icons/chats-white.svg",
      iconHover: "/icons/chats.svg",
      title: "Engage & Learn",
      desc: "Join discussions, ask questions, and get feedback from experts and peers in your areas of interest.",
    },
    {
      icon: "/icons/track-white.svg",
      iconHover: "/icons/track.svg",
      title: "Track Progress",
      desc: "Monitor your learning journey and see how your contributions impact the community over time.",
    },
  ];

  return (
    <section className="pt-12 pb-12 bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-10 text-center ">
          <h2 className="text-center text-3xl md:text-4xl text-white font-medium">
            Everything You Need to Learn & Teach
          </h2>
          <p className=" pt-4 text-white text-lg max-w-2xl mx-auto">
            Our platform provides all the tools and features you need to share
            knowledge, connect with others, and accelerate your learning
            journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, index) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group hover:text-blue-600 bg-blue-600 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md hover:bg-[radial-gradient(circle,hsla(224,89%,83%,1)_0%,hsla(0,0%,100%,1)_100%)]"
            >
              <div className="w-10 h-10 relative flex items-center justify-center rounded-md mb-4">
                <Image
                  src={f.icon}
                  alt={`${f.title} icon`}
                  width={28}
                  height={28}
                  className="block transition-opacity duration-200 ease-out opacity-100 group-hover:opacity-0 object-contain"
                />
                <Image
                  src={f.iconHover}
                  alt={`${f.title} icon (hover)`}
                  width={28}
                  height={28}
                  className="absolute inset-0 m-auto transition-opacity duration-200 ease-out opacity-0 group-hover:opacity-100 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-600">
                {f.title}
              </h3>
              <p className="text-lg text-white group-hover:text-blue-600">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
