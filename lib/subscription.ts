import { db } from './db'

export type AccessStatus = {
  hasAccess: boolean
  isTrialActive: boolean
  isSubscriptionActive: boolean
  trialEndsAt?: Date
  subscriptionEndsAt?: Date
  daysLeft?: number
}

export async function getUserAccessStatus(userId: string): Promise<AccessStatus> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: {
        where: {
          status: 'active'
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    }
  })

  if (!user) {
    return {
      hasAccess: false,
      isTrialActive: false,
      isSubscriptionActive: false
    }
  }

  const now = new Date()
  const isTrialActive = user.trialEndsAt > now
  const activeSubscription = user.subscriptions[0]
  const isSubscriptionActive = Boolean(activeSubscription && 
    activeSubscription.stripeCurrentPeriodEnd && 
    activeSubscription.stripeCurrentPeriodEnd > now)

  const hasAccess = isTrialActive || isSubscriptionActive

  let daysLeft: number | undefined
  if (isTrialActive && !isSubscriptionActive) {
    daysLeft = Math.ceil((user.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  return {
    hasAccess,
    isTrialActive,
    isSubscriptionActive,
    trialEndsAt: user.trialEndsAt,
    subscriptionEndsAt: activeSubscription?.stripeCurrentPeriodEnd || undefined,
    daysLeft
  }
}

export async function hasProductAccess(userId: string): Promise<boolean> {
  const status = await getUserAccessStatus(userId)
  return status.hasAccess
}