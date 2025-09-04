'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { HSK_LEVELS } from '../../../data/hsk-vocabulary'

export default function HSKCoursePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600 mr-8">
                Learn Chinese Easy
              </Link>
              <nav className="flex space-x-8">
                <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 py-2">
                  Practice
                </Link>
                <Link href="/dashboard/hsk" className="text-primary-600 border-b-2 border-primary-600 py-2">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HSK Chinese Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master Chinese vocabulary with our structured HSK courses. From beginner to advanced, 
            learn the essential words you need to pass the HSK exams and communicate effectively.
          </p>
        </div>

        {/* Course Levels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HSK_LEVELS.map((level) => (
            <div
              key={level.level}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Level Header */}
              <div 
                className="h-32 flex items-center justify-center text-white relative"
                style={{ backgroundColor: level.color }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">HSK {level.level}</div>
                  <div className="text-lg opacity-90">
                    {level.totalWords} words
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 rounded-full px-3 py-1 text-sm">
                  {level.lessons.length} lessons
                </div>
              </div>

              {/* Level Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {level.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {level.description}
                </p>

                {/* Lessons Preview */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {level.lessons.slice(0, 4).map((lesson) => (
                      <span
                        key={lesson.id}
                        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {lesson.title}
                      </span>
                    ))}
                    {level.lessons.length > 4 && (
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        +{level.lessons.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/hsk/${level.level}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Start Learning
                  </Link>
                  <Link
                    href={`/dashboard/hsk/${level.level}/test`}
                    className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 text-center py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Take Test
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">2500+</div>
              <div className="text-gray-600">Total Vocabulary Words</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">5</div>
              <div className="text-gray-600">HSK Levels Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">∞</div>
              <div className="text-gray-600">Practice Tests Available</div>
            </div>
          </div>
        </div>

        {/* About HSK */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About HSK</h2>
          <p className="text-gray-600 max-w-4xl mx-auto">
            The HSK (Hanyu Shuiping Kaoshi) is China's official Chinese proficiency test for non-native speakers. 
            Our courses follow the official HSK curriculum, ensuring you learn the most relevant vocabulary for each level. 
            Perfect for exam preparation or systematic Chinese learning.
          </p>
        </div>
      </div>
    </div>
  )
}