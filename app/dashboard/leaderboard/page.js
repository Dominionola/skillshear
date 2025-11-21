"use client"

import { HiBadgeCheck } from 'react-icons/hi'

export default function LeaderboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
                <p className="text-gray-600 mt-1">See how you rank among other learners</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiBadgeCheck className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Leaderboard Coming Soon</h2>
                    <p className="text-gray-600">Compete with other learners and climb to the top!</p>
                </div>
            </div>
        </div>
    )
}
