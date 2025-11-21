export default function StatsCard({ icon: Icon, label, value, trend }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all duration-300">
            {/* Icon */}
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Label */}
            <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>

            {/* Value */}
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>

                {/* Trend indicator (optional) */}
                {trend && (
                    <span className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.positive ? '↑' : '↓'} {trend.value}
                    </span>
                )}
            </div>
        </div>
    )
}
