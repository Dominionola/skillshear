"use client"

import PrivateRoute from '@/app/components/PrivateRoute'
import InstructorSidebar from '@/app/components/instructor/InstructorSidebar'

export default function InstructorLayout({ children }) {
    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gray-50">
                <div className="flex h-screen overflow-hidden">
                    {/* Instructor Sidebar */}
                    <InstructorSidebar />

                    {/* Main content */}
                    <div className="flex-1 flex flex-col overflow-hidden ml-64">
                        <main className="flex-1 overflow-y-auto p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    )
}
