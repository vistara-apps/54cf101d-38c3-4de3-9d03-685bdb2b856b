'use client'

import { useState } from 'react'
import { Clock, MapPin } from 'lucide-react'

interface ReminderSetterProps {
  reminder?: {
    type: 'time' | 'contextual'
    value: string
    active: boolean
  }
  onChange: (reminder: { type: 'time' | 'contextual'; value: string; active: boolean } | undefined) => void
  variant?: 'time' | 'contextual'
}

export default function ReminderSetter({ reminder, onChange, variant }: ReminderSetterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [reminderType, setReminderType] = useState<'time' | 'contextual'>(reminder?.type || 'time')
  const [reminderValue, setReminderValue] = useState(reminder?.value || '')

  const handleSave = () => {
    if (reminderValue.trim()) {
      onChange({
        type: reminderType,
        value: reminderValue.trim(),
        active: true
      })
      setIsOpen(false)
    }
  }

  const handleRemove = () => {
    onChange(undefined)
    setIsOpen(false)
  }

  if (variant === 'time' && !isOpen) {
    return (
      <div className="space-y-2">
        {reminder ? (
          <div className="flex items-center justify-between p-3 bg-surface rounded-md border">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <span className="text-sm text-text">{reminder.value}</span>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="text-accent hover:text-accent/80 text-sm"
            >
              Edit
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-accent hover:text-accent/80 text-sm"
          >
            <Clock size={16} />
            Set time reminder
          </button>
        )}
      </div>
    )
  }

  if (variant === 'contextual' && !isOpen) {
    return (
      <div className="space-y-2">
        {reminder ? (
          <div className="flex items-center justify-between p-3 bg-surface rounded-md border">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              <span className="text-sm text-text">{reminder.value}</span>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="text-accent hover:text-accent/80 text-sm"
            >
              Edit
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-accent hover:text-accent/80 text-sm"
          >
            <MapPin size={16} />
            Set contextual reminder
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => setReminderType('time')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
            reminderType === 'time'
              ? 'bg-accent text-surface'
              : 'bg-surface text-text hover:bg-surface/80'
          }`}
        >
          <Clock size={16} />
          Time-based
        </button>
        <button
          onClick={() => setReminderType('contextual')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
            reminderType === 'contextual'
              ? 'bg-accent text-surface'
              : 'bg-surface text-text hover:bg-surface/80'
          }`}
        >
          <MapPin size={16} />
          Contextual
        </button>
      </div>

      {reminderType === 'time' ? (
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Reminder Date & Time
          </label>
          <input
            type="datetime-local"
            value={reminderValue}
            onChange={(e) => setReminderValue(e.target.value)}
            className="input w-full"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Context Trigger
          </label>
          <input
            type="text"
            value={reminderValue}
            onChange={(e) => setReminderValue(e.target.value)}
            placeholder="e.g., When visiting coffee shops"
            className="input w-full"
          />
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="btn btn-accent flex-1"
        >
          Save Reminder
        </button>
        {reminder && (
          <button
            onClick={handleRemove}
            className="btn bg-red-500 text-white hover:bg-red-600"
          >
            Remove
          </button>
        )}
        <button
          onClick={() => setIsOpen(false)}
          className="btn bg-surface text-text hover:bg-surface/80"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

