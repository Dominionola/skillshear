"use client"

import { useState } from 'react'
import PrivateRoute from '@/app/components/PrivateRoute'
import InstructorSidebar from '@/app/components/instructor/InstructorSidebar'
import InstructorTopNav from '@/app/components/instructor/InstructorTopNav'

export default function InstructorLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gray-50">
                <div className="flex h-screen overflow-hidden">
                    {/* Instructor Sidebar */}
                    <InstructorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                    {/* Main content */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <InstructorTopNav setIsSidebarOpen={setIsSidebarOpen} />
                        <main className="flex-1 overflow-y-auto p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    )
}
