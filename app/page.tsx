'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus } from 'lucide-react'
import { useApp } from '@/lib/context'
import { searchItems } from '@/lib/storage'
import AppShell from '@/components/AppShell'
import NoteCard from '@/components/NoteCard'
import FAB from '@/components/FAB'
import { Item } from '@/types'

export default function HomePage() {
  const { items, isLoading, refreshItems } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const router = useRouter()

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim()) {
        const results = await searchItems(searchQuery)
        setFilteredItems(results)
      } else {
        setFilteredItems(items)
      }
    }

    performSearch()
  }, [searchQuery, items])

  const handleAddNote = () => {
    router.push('/new')
  }

  const handleNoteClick = (item: Item) => {
    router.push(`/note/${item.id}`)
  }

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-text/60">Loading...</div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/60" />
          <input
            type="text"
            placeholder="Search notes, tags, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10"
          />
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-text/60 mb-4">
                {searchQuery ? 'No notes found matching your search.' : 'No notes yet. Start capturing your insights!'}
              </div>
              {!searchQuery && (
                <button
                  onClick={handleAddNote}
                  className="btn btn-accent inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First Note
                </button>
              )}
            </div>
          ) : (
            filteredItems.map((item) => (
              <NoteCard
                key={item.id}
                item={item}
                onClick={() => handleNoteClick(item)}
                variant="preview"
              />
            ))
          )}
        </div>
      </div>

      <FAB onClick={handleAddNote} />
    </AppShell>
  )
}

