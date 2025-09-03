import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export const getStripe = () => {
  let stripePromise: Promise<Stripe | null>
  
  if (typeof window !== 'undefined') {
    if (!stripePromise) {
      stripePromise = import('@stripe/stripe-js').then(({ loadStripe }) => 
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
      )
    }
  }
  
  return stripePromise
}