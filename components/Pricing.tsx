import Link from 'next/link'

const plans = [
  {
    name: 'Family Pack',
    price: '$15',
    description: 'Perfect for small families',
    features: [
      '5 lbs of mixed apple varieties',
      'Free home delivery',
      'Freshness guarantee',
      'Basic customer support',
    ],
    cta: 'Order Now',
    href: '/auth/signup',
    popular: false,
  },
  {
    name: 'Premium Box',
    price: '$35',
    description: 'Our most popular choice',
    features: [
      '10 lbs of premium varieties',
      'Priority delivery',
      'Apple care guide included',
      'Free apple cider sample',
      'Orchard tour discount',
    ],
    cta: 'Order Premium',
    href: '/auth/signup?plan=premium',
    popular: true,
  },
  {
    name: 'Orchard Club',
    price: '$75',
    description: 'For apple enthusiasts',
    features: [
      '20 lbs monthly subscription',
      'Exclusive rare varieties',
      'Monthly orchard events',
      'Personal apple consultant',
      'Custom apple products',
    ],
    cta: 'Join Club',
    href: '/contact',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fresh Apple Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect apple package for your family's needs and taste preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  {plan.name === 'Orchard Club' && (
                    <span className="text-gray-600">/month</span>
                  )}
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
    </section>
  )
}