'use client'

import { useState } from 'react'
import { Plus, Search, Settings, Home } from 'lucide-react'
import { useApp } from '@/lib/context'

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const { isOnline } = useApp()
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface shadow-card px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">TipJar</h1>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-accent' : 'bg-red-500'}`} />
            <span className="text-sm text-text/70">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface shadow-card">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors ${
              activeTab === 'home' ? 'text-accent' : 'text-text/60'
            }`}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors ${
              activeTab === 'search' ? 'text-accent' : 'text-text/60'
            }`}
          >
            <Search size={20} />
            <span className="text-xs">Search</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-2 rounded-md text-accent">
            <Plus size={24} />
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors ${
              activeTab === 'settings' ? 'text-accent' : 'text-text/60'
            }`}
          >
            <Settings size={20} />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>

      {/* Bottom padding for navigation */}
      <div className="h-20" />
    </div>
  )
}

