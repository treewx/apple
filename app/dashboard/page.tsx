'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Viewfinder from '../../components/chinese-app/Viewfinder'
import EnglishInput from '../../components/chinese-app/EnglishInput'
import ChineseDisplay from '../../components/chinese-app/ChineseDisplay'
import { TranslationResponse } from '../../types/chinese-app'
import { AudioService } from '../../lib/chinese-app/audio'

type AccessStatus = {
  hasAccess: boolean
  isTrialActive: boolean
  isSubscriptionActive: boolean
  daysLeft?: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [accessStatus, setAccessStatus] = useState<AccessStatus | null>(null)
  const [currentTranslation, setCurrentTranslation] = useState<TranslationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [audioService, setAudioService] = useState<AudioService | null>(null)

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

  useEffect(() => {
    const service = AudioService.getInstance()
    setAudioService(service)
    service.preloadVoices()
  }, [])

  const handleTranslation = async (englishText: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: englishText }),
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const translation: TranslationResponse = await response.json()
      setCurrentTranslation(translation)
    } catch (error) {
      console.error('Translation error:', error)
      alert('Failed to translate. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayAudio = async () => {
    if (currentTranslation && audioService) {
      try {
        await audioService.playPronunciation(currentTranslation.chinese, 'zh-CN')
      } catch (error) {
        console.error('Audio playback failed:', error)
        audioService.generateBeepSound()
      }
    }
  }


  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Check if user has access to the app
  const hasAccess = accessStatus?.hasAccess || accessStatus?.isTrialActive || accessStatus?.isSubscriptionActive

  if (accessStatus && !hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-primary-600 mr-8">
                  Learn Chinese Easy
                </Link>
                <nav className="flex space-x-8">
                  <Link href="/dashboard" className="text-primary-600 border-b-2 border-primary-600 py-2">
                    Practice
                  </Link>
                  <Link href="/dashboard/hsk" className="text-gray-500 hover:text-gray-700 py-2">
                    HSK Courses
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-semibold">!</span>
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Access Required</h2>
            <p className="text-red-700 mb-6">
              Subscribe to access the Learn Chinese Easy app and start your language learning journey.
            </p>
            <Link
              href="/dashboard/subscriptions"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium inline-block"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Navigation Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white mr-8">
                Learn Chinese Easy
              </Link>
              <nav className="flex space-x-6">
                <Link href="/dashboard" className="text-white border-b-2 border-white py-2">
                  Practice
                </Link>
                <Link href="/dashboard/hsk" className="text-white/80 hover:text-white py-2">
                  HSK Courses
                </Link>
                <Link href="/dashboard/subscriptions" className="text-white/80 hover:text-white py-2">
                  Subscriptions
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/profile"
                className="text-white/80 hover:text-white"
              >
                Profile
              </Link>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-semibold">
                  {session?.user?.name?.[0] || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Status Banner */}
      {accessStatus && !accessStatus.isSubscriptionActive && accessStatus.isTrialActive && (
        <div className="absolute top-16 left-0 right-0 z-40 mx-4">
          <div className="bg-yellow-900/80 backdrop-blur-sm border border-yellow-600/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-600 text-xs font-semibold">!</span>
                </div>
                <div>
                  <p className="text-yellow-100 font-medium text-sm">
                    Free Trial - {accessStatus.daysLeft} day{accessStatus.daysLeft !== 1 ? 's' : ''} remaining
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/subscriptions"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Chinese Learning App */}
      <main className="relative w-full h-screen overflow-hidden">
        <Viewfinder>
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-white text-2xl font-bold mb-2">
                Welcome, {session?.user?.name || 'User'}!
              </h1>
              <p className="text-white/80 text-sm">
                Start learning Chinese with our interactive app
              </p>
            </div>
            
            <EnglishInput 
              onSubmit={handleTranslation}
              isLoading={isLoading}
            />
            
            {currentTranslation && (
              <ChineseDisplay
                translation={currentTranslation}
                onPlayAudio={handlePlayAudio}
              />
            )}
          </div>
        </Viewfinder>
      </main>
    </>
  )
}