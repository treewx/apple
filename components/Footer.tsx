import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">🍎 Apple Orchard</h3>
            <p className="text-gray-400 mb-4">
              Fresh, premium apples from our family orchard, delivered to your door with love and care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                GitHub
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Apples</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-400 hover:text-white">
                  Apple Varieties
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-400 hover:text-white">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  Apple Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Orchard</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-white">
                  Orchard Tours
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Apple Orchard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}