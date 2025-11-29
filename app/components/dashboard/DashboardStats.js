"use client"

import { HiBookOpen, HiLightningBolt, HiAcademicCap } from 'react-icons/hi'

export default function DashboardStats({ enrollments }) {
    // Calculate stats
    const totalEnrolled = enrollments?.length || 0
    const completed = enrollments?.filter(e => e.progress === 100).length || 0
    const inProgress = enrollments?.filter(e => e.progress > 0 && e.progress < 100).length || 0

    // If no enrollments, show empty state stats (or zeros)

    const stats = [
        {
            label: 'Enrolled Courses',
            value: totalEnrolled,
            icon: HiBookOpen,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            label: 'In Progress',
            value: inProgress,
            icon: HiLightningBolt,
            color: 'bg-yellow-100 text-yellow-600',
        },
        {
            label: 'Completed',
            value: completed,
            icon: HiAcademicCap,
            color: 'bg-green-100 text-green-600',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
