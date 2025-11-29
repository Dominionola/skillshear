"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiBookOpen, HiChartBar, HiUsers, HiCog, HiArrowLeft } from 'react-icons/hi'

export default function InstructorSidebar() {
    const pathname = usePathname()

    const links = [
        { name: 'Courses', href: '/instructor', icon: HiBookOpen },
        { name: 'Analytics', href: '/instructor/analytics', icon: HiChartBar },
        { name: 'Students', href: '/instructor/students', icon: HiUsers },
        { name: 'Settings', href: '/instructor/settings', icon: HiCog },
    ]

    return (
        <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col">
            <div className="p-6 border-b border-slate-800">
                <Link href="/instructor" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-white">I</span>
                    </div>
                    <span className="text-xl font-bold">Instructor</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-purple-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <link.icon className="w-5 h-5" />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <HiArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Student View</span>
                </Link>
            </div>
        </div>
    )
}
