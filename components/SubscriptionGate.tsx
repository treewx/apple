'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type AccessStatus = {
  hasAccess: boolean
  isTrialActive: boolean
  isSubscriptionActive: boolean
  daysLeft?: number
}

interface SubscriptionGateProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function SubscriptionGate({ children, fallback }: SubscriptionGateProps) {
  const { data: session } = useSession()
  const [accessStatus, setAccessStatus] = useState<AccessStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAccess() {
      if (!session?.user?.id) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/subscription/status')
        if (response.ok) {
          const status = await response.json()
          setAccessStatus(status)
        }
      } catch (error) {
        console.error('Failed to check subscription status:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [session?.user?.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Sign in required
        </h3>
        <p className="text-gray-600 mb-4">
          Please sign in to access this feature.
        </p>
        <Link
          href="/auth/signin"
          className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Sign In
        </Link>
      </div>
    )
  }

  if (!accessStatus?.hasAccess) {
    return fallback || (
      <div className="text-center p-8 bg-gray-50 rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Subscription Required
        </h3>
        <p className="text-gray-600 mb-4">
          Your trial has expired. Subscribe to continue accessing this feature.
        </p>
        <Link
          href="/dashboard/subscriptions"
          className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Subscribe Now
        </Link>
      </div>
    )
  }

  return (
    <div>
      {accessStatus.isTrialActive && !accessStatus.isSubscriptionActive && accessStatus.daysLeft && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-800">
                <strong>Trial:</strong> {accessStatus.daysLeft} day{accessStatus.daysLeft !== 1 ? 's' : ''} remaining
              </p>
            </div>
            <Link
              href="/dashboard/subscriptions"
              className="text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}