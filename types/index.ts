export interface Item {
  id: string
  title?: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  reminder?: {
    type: 'time' | 'contextual'
    value: string
    active: boolean
  }
  isOffline: boolean
}

export interface User {
  id: string
  farcasterId?: string
  walletAddress?: string
  premiumFeatures: boolean
}

export interface Reminder {
  id: string
  itemId: string
  type: 'time' | 'contextual'
  value: string
  active: boolean
  createdAt: Date
}

