"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { UserAuth } from "@/app/context/ContextAuth"
import { getProfileRole, becomeInstructor } from '@/utils/supabase/profile'
import toast from 'react-hot-toast'
import {
    HiHome,
    HiBookOpen,
    HiUserGroup,
    HiBadgeCheck,
    HiUser,
    HiCog,
    HiX,
    HiMenu,
    HiAcademicCap
} from 'react-icons/hi'

const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HiHome },
    { name: 'My Courses', href: '/dashboard/courses', icon: HiBookOpen },
    { name: 'Community', href: '/dashboard/community', icon: HiUserGroup },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: HiBadgeCheck },
    { name: 'Profile', href: '/dashboard/profile', icon: HiUser },
    { name: 'Settings', href: '/dashboard/settings', icon: HiCog },
]

export default function Sidebar({ isOpen, setIsOpen }) {
    const pathname = usePathname()
    const router = useRouter()
    const { session } = UserAuth()
    const [role, setRole] = useState('student')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRole() {
            if (session?.user?.id) {
                const { role } = await getProfileRole(session.user.id)
                setRole(role)
            }
            setLoading(false)
        }
        fetchRole()
    }, [session])

    const handleBecomeInstructor = async () => {
        if (!session?.user?.id) return

        const toastId = toast.loading('Setting up your instructor account...')
        const { error } = await becomeInstructor(session.user.id)

        if (error) {
            toast.error('Failed to update role', { id: toastId })
        } else {
            toast.success('You are now an instructor!', { id: toastId })
            setRole('instructor')
            router.push('/instructor')
        }
    }

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-64 bg-white
                    border-r border-gray-200 transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0 lg:static lg:z-auto flex flex-col
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo & Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="SkillShear Logo"
                                width={32}
                                height={32}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            SkillShear
                        </span>
                    </Link>

                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <HiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                                    ${isActive
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Instructor CTA */}
                {!loading && (
                    <div className="p-4 border-t border-gray-200">
                        {role === 'instructor' ? (
                            <Link
                                href="/instructor"
                                className="flex items-center justify-center w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                            >
                                <HiAcademicCap className="w-5 h-5 mr-2" />
                                Instructor View
                            </Link>
                        ) : (
                            <button
                                onClick={handleBecomeInstructor}
                                className="flex items-center justify-center w-full bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm"
                            >
                                <HiAcademicCap className="w-5 h-5 mr-2" />
                                Become an Instructor
                            </button>
                        )}
                    </div>
                )}
            </aside>
        </>
    )
}

