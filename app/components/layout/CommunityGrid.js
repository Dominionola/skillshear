import Image from 'next/image'

export default function CommunityGrid({ communities }) {
  const sample = communities || [
    {
      id: 'react-devs',
      name: 'React Developers',
      desc: 'Discuss React, Next.js and frontend patterns.',
      tags: ['frontend', 'react', 'nextjs'],
      members: ['/assets/1stWO.jpg','/assets/2ndWO.jpg','/assets/3rdWO.jpg'],
      memberCount: 1240,
    },
    {
      id: 'design-growth',
      name: 'Design & Growth',
      desc: 'Product, UX and growth experiments.',
      tags: ['design','ux','growth'],
      members: ['/assets/4thWO.jpg','/assets/1stWO.jpg'],
      memberCount: 842,
    },
    {
      id: 'python-data',
      name: 'Python & Data Science',
      desc: 'Data tooling, ML experiments and tutorials.',
      tags: ['python','ml','data'],
      members: ['/assets/2ndWO.jpg','/assets/3rdWO.jpg','/assets/4thWO.jpg','/assets/1stWO.jpg'],
      memberCount: 530,
    },
  ]

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sample.map((c) => (
            <article
              key={c.id}
              tabIndex={0}
              className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md focus:shadow-md transition-shadow hover:scale-[1.01] focus:scale-[1.01] transform will-change-transform"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {c.name}
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">{c.desc}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex -space-x-2 items-center">
                    {c.members.slice(0,4).map((m, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-gray-100">
                        <Image src={m} width={32} height={32} alt="member" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="ml-2 text-xs text-gray-500">{c.memberCount.toLocaleString()} members</div>
                  </div>

                  <button className="mt-4 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
