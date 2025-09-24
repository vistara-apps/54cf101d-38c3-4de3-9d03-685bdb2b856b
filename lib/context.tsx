'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Item, User } from '@/types'
import { getItems, getUser, saveUser, initStorage } from '@/lib/storage'

interface AppContextType {
  items: Item[]
  user: User | null
  isLoading: boolean
  refreshItems: () => Promise<void>
  refreshUser: () => Promise<void>
  isOnline: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  const refreshItems = async () => {
    try {
      const fetchedItems = await getItems()
      setItems(fetchedItems)
    } catch (error) {
      console.error('Error refreshing items:', error)
    }
  }

  const refreshUser = async () => {
    try {
      const fetchedUser = await getUser()
      setUser(fetchedUser)
    } catch (error) {
      console.error('Error refreshing user:', error)
    }
  }

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initStorage()
        await Promise.all([refreshItems(), refreshUser()])
      } catch (error) {
        console.error('Error initializing app:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeApp()

    // Monitor online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <AppContext.Provider value={{
      items,
      user,
      isLoading,
      refreshItems,
      refreshUser,
      isOnline
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

