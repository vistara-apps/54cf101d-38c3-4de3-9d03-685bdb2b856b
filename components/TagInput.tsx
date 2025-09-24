'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Plus } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  variant?: 'editable' | 'display'
  placeholder?: string
}

export default function TagInput({
  tags,
  onChange,
  variant = 'editable',
  placeholder = 'Add tags...'
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag])
    }
    setInputValue('')
  }

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  if (variant === 'display') {
    return (
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 min-h-[32px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-sm"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:bg-primary/20 rounded-full p-0.5"
            >
              <X size={10} />
            </button>
          </span>
        ))}

        {isEditing && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (inputValue.trim()) {
                addTag(inputValue)
              }
              setIsEditing(false)
            }}
            className="input text-xs min-w-[80px] h-6 px-2 py-1"
            placeholder={placeholder}
          />
        )}
      </div>

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center gap-1 text-accent hover:text-accent/80 text-sm"
        >
          <Plus size={14} />
          Add tag
        </button>
      )}
    </div>
  )
}

