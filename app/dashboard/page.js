"use client"

import { UserAuth } from "../context/ContextAuth"
import StatsCard from "../components/dashboard/StatsCard"
import { HiBookOpen, HiCheckCircle, HiStar, HiTrendingUp } from 'react-icons/hi'

export default function DashboardPage() {
    const { session } = UserAuth()

    // Get user's first name or email
    const userName = session?.user?.user_metadata?.first_name || session?.user?.email?.split('@')[0] || 'User'

    // Placeholder stats - will be replaced with real data later
    const stats = [
        { icon: HiBookOpen, label: 'Courses Enrolled', value: '0' },
        { icon: HiCheckCircle, label: 'Courses Completed', value: '0' },
        { icon: HiStar, label: 'Points Earned', value: '0' },
        { icon: HiTrendingUp, label: 'Current Level', value: '1' },
    ]

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {userName}! 👋
                </h1>
                <p className="text-gray-600">
                    Ready to continue your learning journey? Let's make today count!
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        icon={stat.icon}
                        label={stat.label}
                        value={stat.value}
                    />
                ))}
            </div>

            {/* Continue Learning Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h2>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiBookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Browse Courses
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiTrendingUp className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">No recent activity to show</p>
                </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiStar className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">Check back soon for personalized recommendations</p>
                </div>
            </div>
        </div>
    )
}