'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { StripeCheckout } from '@/components/StripeCheckout'

const plans = [
  {
    name: 'Starter',
    paymentLink: 'https://buy.stripe.com/test_7sYcMY3p41xXbmNgOs18c03',
    amount: '$9/month',
    features: [
      'Basic features',
      '1,000 API calls/month',
      'Email support',
      'Community access',
    ],
  },
  {
    name: 'Pro',
    paymentLink: '', // Add your Pro plan payment link here
    amount: '$29/month',
    features: [
      'All Starter features',
      'Unlimited API calls',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
    ],
  },
  {
    name: 'Enterprise',
    paymentLink: '', // Add your Enterprise plan payment link here
    amount: '$99/month',
    features: [
      'All Pro features',
      'Dedicated support',
      'Custom development',
      'SLA guarantees',
      'White-label options',
    ],
  },
]

export default function SubscriptionsPage() {
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
            Subscription Plans
          </h1>
          <p className="text-gray-600">
            Choose the plan that works best for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-sm p-6 ${
                index === 1 ? 'ring-2 ring-primary-600 relative' : 'border border-gray-200'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}

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
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.paymentLink ? (
                <a
                  href={plan.paymentLink}
                  className={`w-full text-center px-4 py-2 rounded-lg font-semibold transition-colors block ${
                    index === 1
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Subscribe to {plan.name}
                </a>
              ) : (
                <button
                  disabled
                  className="w-full text-center px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-500 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Current Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">You are currently on the <span className="font-semibold">Free Plan</span></p>
              <p className="text-sm text-gray-500">Upgrade to unlock more features and capabilities</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">$0</p>
              <p className="text-sm text-gray-500">per month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}