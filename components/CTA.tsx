import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 bg-apple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Think in Chinese?
        </h2>
        <p className="text-xl text-apple-100 mb-8 max-w-2xl mx-auto">
          Join thousands of learners who have transformed their language skills with our AI-powered visual learning system.
        </p>
        <Link
          href="/auth/signup"
          className="bg-white text-apple-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
        >
          Start Your Journey Today
        </Link>
      </div>
    </section>
  )
}