'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface SubscribeButtonProps {
  priceId: string
  planName: string
  className?: string
}

export function SubscribeButton({ priceId, planName, className }: SubscribeButtonProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!session) {
      window.location.href = '/auth/signin'
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Processing...' : `Subscribe to ${planName}`}
    </button>
  )
}