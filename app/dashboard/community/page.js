"use client"

import { HiUserGroup } from 'react-icons/hi'

export default function CommunityPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Community</h1>
                <p className="text-gray-600 mt-1">Connect with learners and share knowledge</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiUserGroup className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Community Coming Soon</h2>
                    <p className="text-gray-600">Connect with fellow learners, share insights, and grow together!</p>
                </div>
            </div>
        </div>
    )
}
