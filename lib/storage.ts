import { Item, User } from '@/types'
import '@/types/minikit'

// Storage keys
const ITEMS_KEY = 'tipjar_items'
const USER_KEY = 'tipjar_user'

// Initialize storage with Base Minikit
export const initStorage = async () => {
  if (typeof window !== 'undefined') {
    // Base Minikit storage is available globally
    return true
  }
  return false
}

// Items CRUD operations
export const getItems = async (): Promise<Item[]> => {
  try {
    if (typeof window !== 'undefined' && window.minikit?.storage) {
      const data = await window.minikit.storage.get(ITEMS_KEY)
      return data ? JSON.parse(data) : []
    }
    // Fallback to localStorage for development
    const data = localStorage.getItem(ITEMS_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error getting items:', error)
    return []
  }
}

export const saveItem = async (item: Item): Promise<void> => {
  try {
    const items = await getItems()
    const existingIndex = items.findIndex(i => i.id === item.id)

    if (existingIndex >= 0) {
      items[existingIndex] = { ...item, updatedAt: new Date() }
    } else {
      items.push(item)
    }

    const data = JSON.stringify(items)

    if (typeof window !== 'undefined' && window.minikit?.storage) {
      await window.minikit.storage.set(ITEMS_KEY, data)
    } else {
      // Fallback to localStorage
      localStorage.setItem(ITEMS_KEY, data)
    }
  } catch (error) {
    console.error('Error saving item:', error)
    throw error
  }
}

export const deleteItem = async (itemId: string): Promise<void> => {
  try {
    const items = await getItems()
    const filteredItems = items.filter(item => item.id !== itemId)
    const data = JSON.stringify(filteredItems)

    if (typeof window !== 'undefined' && window.minikit?.storage) {
      await window.minikit.storage.set(ITEMS_KEY, data)
    } else {
      localStorage.setItem(ITEMS_KEY, data)
    }
  } catch (error) {
    console.error('Error deleting item:', error)
    throw error
  }
}

// User operations
export const getUser = async (): Promise<User | null> => {
  try {
    if (typeof window !== 'undefined' && window.minikit?.storage) {
      const data = await window.minikit.storage.get(USER_KEY)
      return data ? JSON.parse(data) : null
    }
    // Fallback to localStorage
    const data = localStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export const saveUser = async (user: User): Promise<void> => {
  try {
    const data = JSON.stringify(user)

    if (typeof window !== 'undefined' && window.minikit?.storage) {
      await window.minikit.storage.set(USER_KEY, data)
    } else {
      localStorage.setItem(USER_KEY, data)
    }
  } catch (error) {
    console.error('Error saving user:', error)
    throw error
  }
}

// Smart tagging utility
export const generateTags = (content: string): string[] => {
  const words = content.toLowerCase().split(/\s+/)
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
  ])

  const tags = words
    .filter(word => word.length > 3 && !commonWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index) // Remove duplicates
    .slice(0, 5) // Limit to 5 tags

  return tags
}

// Search functionality
export const searchItems = async (query: string, tags: string[] = []): Promise<Item[]> => {
  const items = await getItems()
  const searchTerm = query.toLowerCase()

  return items.filter(item => {
    const contentMatch = item.content.toLowerCase().includes(searchTerm)
    const titleMatch = item.title?.toLowerCase().includes(searchTerm) || false
    const tagMatch = tags.length === 0 || tags.some(tag =>
      item.tags.some(itemTag => itemTag.toLowerCase().includes(tag.toLowerCase()))
    )

    return (contentMatch || titleMatch) && tagMatch
  })
}

// Sync functionality (placeholder for future implementation)
export const syncItems = async (): Promise<void> => {
  // This would sync with a backend service when online
  console.log('Syncing items...')
}
