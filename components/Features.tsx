const features = [
  {
    title: 'User Authentication',
    description: 'Secure signup, login, and session management with NextAuth.js',
    icon: '🔐',
  },
  {
    title: 'PostgreSQL Database',
    description: 'Robust database setup with Prisma ORM for data management',
    icon: '🗃️',
  },
  {
    title: 'Payment Gateway',
    description: 'Stripe integration for subscriptions and one-time payments',
    icon: '💳',
  },
  {
    title: 'Responsive Design',
    description: 'Mobile-first design that looks great on all devices',
    icon: '📱',
  },
  {
    title: 'Dashboard',
    description: 'User dashboard with profile management and analytics',
    icon: '📊',
  },
  {
    title: 'Email Integration',
    description: 'Email verification and transactional email support',
    icon: '📧',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A complete business template with all the essential features to get your startup running quickly.
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