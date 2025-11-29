"use client"

import { useState, useEffect } from 'react'
import { UserAuth } from "@/app/context/ContextAuth"
import CourseList from '@/app/components/instructor/CourseList'
import { HiUsers, HiCurrencyDollar, HiStar } from 'react-icons/hi'

export default function InstructorDashboard() {
    const { session } = UserAuth()
    const [stats, setStats] = useState([
        { name: 'Total Students', value: '0', icon: HiUsers, color: 'bg-blue-500' },
        { name: 'Total Revenue', value: '$0.00', icon: HiCurrencyDollar, color: 'bg-green-500' },
        { name: 'Average Rating', value: '0.0', icon: HiStar, color: 'bg-yellow-500' },
    ])

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
                <p className="text-gray-500">Manage your courses and track your performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl border border-gray-200 p-6 flex items-center shadow-sm">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Course List */}
            <CourseList userId={session?.user?.id} />
        </div>
    )
}
