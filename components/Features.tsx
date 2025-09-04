const features = [
  {
    title: 'Visual Learning',
    description: 'AI-powered system that matches images to Chinese sounds for natural association',
    icon: '🖼️',
  },
  {
    title: 'Pronunciation Guide',
    description: 'Native audio pronunciation for every character and phrase',
    icon: '🎵',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and milestones',
    icon: '📈',
  },
  {
    title: 'Spaced Repetition',
    description: 'Smart review system that optimizes retention and long-term memory',
    icon: '🔄',
  },
  {
    title: 'Cultural Context',
    description: 'Learn phrases in real-world situations with cultural background',
    icon: '🏮',
  },
  {
    title: 'Mobile Friendly',
    description: 'Practice anywhere, anytime with our responsive mobile interface',
    icon: '📱',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Learning Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced tools designed to make learning Mandarin Chinese intuitive, effective, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}