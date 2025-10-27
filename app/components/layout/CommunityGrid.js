import Image from "next/image";
import Link from "next/link";

export default function CommunityGrid({ communities }) {
  const sample = communities || [
    {
      id: "react-devs",
      name: "React Developers",
      desc: "Discuss React, Next.js and frontend patterns.",
      tags: ["frontend", "react", "nextjs"],
      members: ["/assets/1stWO.jpg", "/assets/2ndWO.jpg", "/assets/3rdWO.jpg"],
      memberCount: 1240,
    },
    {
      id: "design-growth",
      name: "Design & Growth",
      desc: "Product, UX and growth experiments.",
      tags: ["design", "ux", "growth"],
      members: ["/assets/4thWO.jpg", "/assets/1stWO.jpg"],
      memberCount: 842,
    },
    {
      id: "python-data",
      name: "Python & Data Science",
      desc: "Data tooling, ML experiments and tutorials.",
      tags: ["python", "ml", "data"],
      members: [
        "/assets/2ndWO.jpg",
        "/assets/3rdWO.jpg",
        "/assets/4thWO.jpg",
        "/assets/1stWO.jpg",
      ],
      memberCount: 530,
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sample.map((c) => (
            <article
              key={c.id}
              tabIndex={0}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-0.5"
            >
              {/* Image banner */}
              <div className="relative rounded-t-2xl overflow-hidden">
                <Image
                  src={c.members[0]}
                  alt={c.name}
                  width={1200}
                  height={640}
                  className="w-full h-44 object-cover block"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-sm text-gray-800 px-3 py-1 rounded-md font-medium">
                  Staff Pick
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div>{c.memberCount.toLocaleString()} students</div>
                  <div>16h 8m</div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{c.desc}</p>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2 items-center">
                    {c.members.slice(0, 4).map((m, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-gray-100"
                      >
                        <Image
                          src={m}
                          width={32}
                          height={32}
                          alt="member"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-700">Daniel Scott</div>
                </div>
              </div>
            </article>
          ))}
        </div>
<Link href="/communities" className="mt-8 inline-block w-full text-center text-blue-600 font-medium">
          View All Communities
        </Link>
      </div>
    </section>
  );
}
