import Image from "next/image";

export default function FeatureSection() {
  const features = [
    {
      icon: "/icons/share.svg",
      title: "Share Your Skills",
      desc: "Create engaging posts to share your expertise, tutorials, and knowledge with a global community of learners.",
    },
    {
      icon: "/icons/connect.svg",
      title: "Connect & Collaborate",
      desc: "Build meaningful connections with like-minded individuals and collaborate on projects that matter to you.",
    },
    {
      icon: "/icons/discover.svg",
      title: "Discover Resources",
      desc: "Find exactly what you're looking for with powerful search and filtering tools across all shared content.",
    },
    {
      icon: "/icons/bookmark.svg",
      title: "Save & Organize",
      desc: "Bookmark valuable content and organize your learning materials for easy access whenever you need them.",
    },
    {
      icon: "/icons/chats.svg",
      title: "Engage & Learn",
      desc: "Join discussions, ask questions, and get feedback from experts and peers in your areas of interest.",
    },
    {
      icon: "/icons/track.svg",
      title: "Track Progress",
      desc: "Monitor your learning journey and see how your contributions impact the community over time.",
    },
  ];

  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-10 text-center ">
          <h2 className="text-center text-3xl md:text-4xl text-medium">
            Everything You Need to Learn & Teach
          </h2>
          <p className=" pt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Our platform provides all the tools and features you need to share
            knowledge, connect with others, and accelerate your learning
            journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md hover:bg-[radial-gradient(circle,hsla(224,89%,83%,1)_0%,hsla(0,0%,100%,1)_100%)]"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-md text-blue-600 mb-4">
                <Image src={f.icon} alt="" width={30} height={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-lg text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
