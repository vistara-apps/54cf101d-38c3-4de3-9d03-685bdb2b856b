'use client'

import { Plus } from 'lucide-react'

interface FABProps {
  onClick: () => void
  variant?: 'addNote'
}

export default function FAB({ onClick, variant = 'addNote' }: FABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 bg-accent hover:bg-accent/90 text-surface rounded-full shadow-lg flex items-center justify-center transition-all duration-250 hover:scale-105 active:scale-95 z-10"
      aria-label="Add new note"
    >
      <Plus size={24} />
    </button>
  )
}

