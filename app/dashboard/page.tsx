'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

const stats = [
  { name: 'Total Orders', value: '12', change: '+4.75%', changeType: 'positive' },
  { name: 'Total Revenue', value: '$1,234', change: '+54.02%', changeType: 'positive' },
  { name: 'Active Subscriptions', value: '3', change: '-1.39%', changeType: 'negative' },
  { name: 'Conversion Rate', value: '3.24%', change: '+10.18%', changeType: 'positive' },
]

const recentActivity = [
  { id: 1, type: 'payment', description: 'Payment received', amount: '$99.00', time: '2 hours ago' },
  { id: 2, type: 'user', description: 'Profile updated', time: '4 hours ago' },
  { id: 3, type: 'subscription', description: 'Subscription renewed', amount: '$29.00', time: '1 day ago' },
  { id: 4, type: 'payment', description: 'Payment received', amount: '$199.00', time: '2 days ago' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600 mr-8">
                BusinessTemplate
              </Link>
              <nav className="flex space-x-8">
                <Link href="/dashboard" className="text-primary-600 border-b-2 border-primary-600 py-2">
                  Dashboard
                </Link>
                <Link href="/dashboard/orders" className="text-gray-500 hover:text-gray-700 py-2">
                  Orders
                </Link>
                <Link href="/dashboard/subscriptions" className="text-gray-500 hover:text-gray-700 py-2">
                  Subscriptions
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/profile"
                className="text-gray-700 hover:text-primary-600"
              >
                Profile
              </Link>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {session?.user?.name?.[0] || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {session?.user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your business today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        activity.type === 'payment' ? 'bg-green-100' :
                        activity.type === 'subscription' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {activity.type === 'payment' ? '💳' : 
                         activity.type === 'subscription' ? '🔄' : '👤'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    {activity.amount && (
                      <div className="text-sm font-medium text-green-600">
                        {activity.amount}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Link
                  href="/dashboard/subscriptions"
                  className="block w-full bg-primary-600 text-white text-center py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Manage Subscriptions
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  View All Orders
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}