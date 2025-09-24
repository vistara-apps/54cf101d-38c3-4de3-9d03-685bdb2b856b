'use client'

import { format } from 'date-fns'
import { Clock, Tag } from 'lucide-react'
import { Item } from '@/types'

interface NoteCardProps {
  item: Item
  onClick?: () => void
  variant?: 'display' | 'preview'
}

export default function NoteCard({ item, onClick, variant = 'preview' }: NoteCardProps) {
  const isPreview = variant === 'preview'

  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer hover:shadow-lg transition-shadow animate-fade-in ${
        isPreview ? 'max-h-32 overflow-hidden' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-text truncate">
          {item.title || 'Untitled Note'}
        </h3>
        <span className="text-xs text-text/60 ml-2 flex-shrink-0">
          {format(new Date(item.createdAt), 'MMM d')}
        </span>
      </div>

      <p className={`text-text/80 mb-3 ${isPreview ? 'line-clamp-2' : ''}`}>
        {item.content}
      </p>

      {item.tags.length > 0 && (
        <div className="flex items-center gap-1 mb-2 flex-wrap">
          <Tag size={14} className="text-text/60" />
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-sm"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-xs text-text/60">
              +{item.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {item.reminder && item.reminder.active && (
        <div className="flex items-center gap-1 text-accent">
          <Clock size={14} />
          <span className="text-xs">
            {item.reminder.type === 'time' ? 'Time reminder' : 'Context reminder'}
          </span>
        </div>
      )}

      {!item.isOffline && (
        <div className="mt-2 text-xs text-accent">
          Synced
        </div>
      )}
    </div>
  )
}

