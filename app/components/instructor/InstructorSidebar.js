"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiBookOpen, HiChartBar, HiUsers, HiCog, HiArrowLeft } from 'react-icons/hi'

export default function InstructorSidebar({ isOpen, setIsOpen }) {
    const pathname = usePathname()

    const links = [
        { name: 'Courses', href: '/instructor', icon: HiBookOpen },
        { name: 'Analytics', href: '/instructor/analytics', icon: HiChartBar },
        { name: 'Students', href: '/instructor/students', icon: HiUsers },
        { name: 'Settings', href: '/instructor/settings', icon: HiCog },
    ]

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`
                    fixed top-0 left-0 z-50 h-full w-64 bg-white
                    border-r border-gray-200 transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0 lg:static lg:z-auto flex flex-col
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo & Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <Link href="/instructor" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white">I</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Instructor</span>
                    </Link>

                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <HiArrowLeft className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {links.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        <HiArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Student View</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
