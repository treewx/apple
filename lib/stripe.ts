import Stripe from 'stripe'
import { Stripe as StripeJS } from '@stripe/stripe-js'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

let stripePromise: Promise<StripeJS | null> | undefined

export const getStripe = () => {
  if (typeof window !== 'undefined') {
    if (!stripePromise) {
      stripePromise = import('@stripe/stripe-js').then(({ loadStripe }) => 
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
      )
    }
  }
  
  return stripePromise
}