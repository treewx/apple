import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 bg-apple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Taste the Difference?
        </h2>
        <p className="text-xl text-apple-100 mb-8 max-w-2xl mx-auto">
          Join thousands of families who have discovered the joy of fresh, premium apples from our orchard.
        </p>
        <Link
          href="/auth/signup"
          className="bg-white text-apple-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
        >
          Order Your Apples Today
        </Link>
      </div>
    </section>
  )
}