"use client"

import { HiStar } from 'react-icons/hi'

export default function DashboardPage() {
    return (
        <div className="p-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h2>
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