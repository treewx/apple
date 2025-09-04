'use client'

import { useState, useRef, useEffect } from 'react'

interface ViewfinderProps {
  children?: React.ReactNode;
}

export default function Viewfinder({ children }: ViewfinderProps) {
  const [isActive, setIsActive] = useState(false)
  const viewfinderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsActive(true)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div 
        ref={viewfinderRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20"></div>
        
        <div className="absolute inset-4 border-2 border-white/30 rounded-lg">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/60 text-center">
            <div className="text-4xl mb-4">📷</div>
            <p className="text-lg">Point and learn Chinese</p>
          </div>
        </div>

        {children && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {children}
          </div>
        )}

        {isActive && (
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">LIVE</span>
          </div>
        )}

      </div>
    </div>
  )
}