'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { SubscribeButton } from '@/components/SubscribeButton'
import { useEffect, useState } from 'react'

type AccessStatus = {
  hasAccess: boolean
  isTrialActive: boolean
  isSubscriptionActive: boolean
  daysLeft?: number
}

// You need to get the actual price ID from your Stripe Dashboard
// Go to Products -> Your Product -> Pricing and copy the price ID (starts with price_)
const PRICE_ID = 'price_1S3CNW2UCVbu3P6FDs8iTbFR' // Replace with your actual price ID from Stripe

const plan = {
  name: 'Premium',
  priceId: PRICE_ID,
  amount: '$5/month',
  features: [
    'Full access to all features',
    'Unlimited usage',
    'Priority support',
    'Regular updates',
  ],
}

export default function SubscriptionsPage() {
  const { data: session, status } = useSession()
  const [accessStatus, setAccessStatus] = useState<AccessStatus | null>(null)

  useEffect(() => {
    async function checkAccess() {
      if (!session?.user?.id) return

      try {
        const response = await fetch('/api/subscription/status')
        if (response.ok) {
          const status = await response.json()
          setAccessStatus(status)
        }
      } catch (error) {
        console.error('Failed to check subscription status:', error)
      }
    }

    checkAccess()
  }, [session?.user?.id])

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
                <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 py-2">
                  Dashboard
                </Link>
                <Link href="/dashboard/orders" className="text-gray-500 hover:text-gray-700 py-2">
                  Orders
                </Link>
                <Link href="/dashboard/subscriptions" className="text-primary-600 border-b-2 border-primary-600 py-2">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription
          </h1>
          <p className="text-gray-600">
            Access all features with your subscription or free trial.
          </p>
        </div>

        {/* Current Status */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Current Status</h2>
          {accessStatus ? (
            <div>
              {accessStatus.isSubscriptionActive ? (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-gray-900 font-semibold">Active Subscription</p>
                    <p className="text-sm text-gray-500">You have full access to all features</p>
                  </div>
                </div>
              ) : accessStatus.isTrialActive ? (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-gray-900 font-semibold">
                      Free Trial - {accessStatus.daysLeft} day{accessStatus.daysLeft !== 1 ? 's' : ''} remaining
                    </p>
                    <p className="text-sm text-gray-500">Subscribe before your trial ends to continue using all features</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-gray-900 font-semibold">Trial Expired</p>
                    <p className="text-sm text-gray-500">Subscribe to regain access to all features</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          )}
        </div>

        {/* Subscription Plan */}
        {!accessStatus?.isSubscriptionActive && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.amount}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <SubscribeButton
              priceId={plan.priceId}
              planName={plan.name}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors"
            />
          </div>
        )}
      </div>
    </div>
  )
}