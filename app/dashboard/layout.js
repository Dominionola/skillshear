"use client"

import { useState } from 'react'
import PrivateRoute from '@/app/components/PrivateRoute'
import Sidebar from '@/app/components/dashboard/Sidebar'
import TopNav from '@/app/components/dashboard/TopNav'

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gray-50">
                <div className="flex h-screen overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                    {/* Main content */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <TopNav setIsSidebarOpen={setIsSidebarOpen} />
                        <main className="flex-1 overflow-y-auto p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    )
}
