'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              🍎 Apple Orchard
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-primary-600">
              Varieties
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-primary-600">
              Packages
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600">
              Our Orchard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-gray-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
                >
                  Order Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}