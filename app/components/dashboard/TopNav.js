"use client"

import { useState } from 'react'
import { UserAuth } from '@/app/context/ContextAuth'
import { useRouter } from 'next/navigation'
import { HiMenu, HiSearch, HiBell, HiChevronDown } from 'react-icons/hi'

export default function TopNav({ setIsSidebarOpen }) {
    const { session, signOut } = UserAuth()
    const router = useRouter()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleSignOut = async () => {
        try {
            await signOut()
            router.push('/')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    // Get user's first name or email
    const userName = session?.user?.user_metadata?.first_name || session?.user?.email?.split('@')[0] || 'User'
    const userEmail = session?.user?.email

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 lg:px-6 py-4">
                {/* Left: Mobile menu button + Search */}
                <div className="flex items-center space-x-4 flex-1">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <HiMenu className="w-6 h-6" />
                    </button>

                    {/* Search bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-md">
                        <div className="relative w-full">
                            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses, community..."
                                className="w-full bg-gray-50 text-gray-900 placeholder-gray-500 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Notifications + User menu */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
                        <HiBell className="w-6 h-6" />
                        {/* Notification badge */}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full text-xs text-white flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {/* User menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                        >
                            {/* Avatar */}
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {userName.charAt(0).toUpperCase()}
                                </span>
                            </div>

                            {/* Name (hidden on mobile) */}
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-900">{userName}</p>
                                <p className="text-xs text-gray-500">Level 1</p>
                            </div>

                            <HiChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <>
                                {/* Backdrop for mobile */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsDropdownOpen(false)}
                                />

                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                    {/* User info */}
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                                    </div>

                                    {/* Menu items */}
                                    <button
                                        onClick={() => {
                                            router.push('/dashboard/profile')
                                            setIsDropdownOpen(false)
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                    >
                                        View Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            router.push('/dashboard/settings')
                                            setIsDropdownOpen(false)
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                    >
                                        Settings
                                    </button>

                                    <div className="border-t border-gray-200 mt-2 pt-2">
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
