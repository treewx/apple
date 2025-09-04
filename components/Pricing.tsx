import Link from 'next/link'

const plans = [
  {
    name: 'Learn Chinese Easy',
    price: '$5',
    description: 'Everything you need to master Mandarin',
    features: [
      'AI-powered visual learning system',
      'Native pronunciation audio',
      'Progress tracking & analytics',
      'Spaced repetition algorithm',
      'Cultural context lessons',
      'Mobile learning access',
      'Unlimited practice sessions',
      'Community support',
    ],
    cta: 'Start Learning',
    href: '/auth/signup',
    popular: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get full access to our AI-powered Chinese learning platform for just $5/month.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-md w-full">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm p-8 ${
                plan.popular
                  ? 'ring-2 ring-primary-600 relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full block text-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}