'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { HSK_LEVELS } from '../../../../data/hsk-vocabulary'
import { HSKLevel } from '../../../../types/chinese-app/hsk'

export default function HSKLevelPage() {
  const { data: session } = useSession()
  const params = useParams()
  const levelNumber = parseInt(params.level as string)
  
  const level: HSKLevel | undefined = HSK_LEVELS.find(l => l.level === levelNumber)

  if (!level) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Level Not Found</h1>
          <Link href="/dashboard/hsk" className="text-primary-600 hover:underline">
            Back to HSK Courses
          </Link>
        </div>
      </div>
    )
  }

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
                <Link href="/dashboard/hsk" className="text-gray-500 hover:text-gray-700 py-2">
                  HSK Courses
                </Link>
                <span className="text-primary-600 border-b-2 border-primary-600 py-2">
                  HSK Level {levelNumber}
                </span>
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
        {/* Level Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4">
            <Link href="/dashboard/hsk" className="text-gray-500 hover:text-gray-700">
              ← Back to All Levels
            </Link>
          </div>
          
          <div 
            className="inline-block px-8 py-4 rounded-2xl text-white mb-6"
            style={{ backgroundColor: level.color }}
          >
            <h1 className="text-4xl font-bold mb-2">
              {level.title}
            </h1>
            <p className="text-xl opacity-90">
              {level.totalWords} words • {level.lessons.length} lessons
            </p>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {level.description}
          </p>

          {/* Quick Actions */}
          <div className="flex justify-center gap-4 mb-8">
            <Link
              href={`/dashboard/hsk/${levelNumber}/test`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Take Full Test
            </Link>
            <button className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium transition-colors">
              View Progress
            </button>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {level.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Lesson Number Badge */}
              <div className="relative">
                <div 
                  className="h-24 flex items-center justify-center text-white"
                  style={{ backgroundColor: level.color }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">Lesson {index + 1}</div>
                    <div className="text-sm opacity-90">{lesson.words.length} words</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 rounded-full px-2 py-1 text-white text-xs">
                  ~{lesson.estimatedTime}min
                </div>
              </div>

              {/* Lesson Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {lesson.description}
                </p>

                {/* Word Preview */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {lesson.words.slice(0, 6).map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className="inline-block bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded"
                      >
                        {word.chinese}
                      </span>
                    ))}
                    {lesson.words.length > 6 && (
                      <span className="inline-block bg-gray-100 text-gray-500 text-sm px-2 py-1 rounded">
                        +{lesson.words.length - 6}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/hsk/${levelNumber}/lesson/${lesson.id}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Learn
                  </Link>
                  <Link
                    href={`/dashboard/hsk/${levelNumber}/lesson/${lesson.id}/test`}
                    className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Test
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
              <div className="text-gray-600">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600">Words Learned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-600">Tests Taken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">0%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>0 / {level.totalWords} words</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: level.color,
                  width: '0%'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}