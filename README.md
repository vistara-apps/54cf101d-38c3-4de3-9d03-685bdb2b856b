# TipJar - Capture Your Best Insights

A Base MiniApp for capturing, organizing, and recalling offline insights, tips, tricks, and contacts with smart tagging and contextual reminders.

## Features

### Core Features
- **Offline Capture**: Save notes, tips, and contacts without internet connection
- **Smart Tagging**: Automatic tag suggestions based on content analysis
- **Contextual Reminders**: Time-based and context-based reminder system
- **Local Storage**: Data persists locally and syncs when online

### Business Model
- Freemium model with micro-transactions for premium features
- Free tier: Up to 20 saved items with basic tagging
- Premium: Unlimited items, advanced smart tagging, recurring reminders

## Technical Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **Storage**: Base Minikit storage API with localStorage fallback
- **Identity**: Farcaster integration via Base SDK
- **Deployment**: Base MiniApp

### Data Models

#### Item Entity
```typescript
interface Item {
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
```

#### User Entity
```typescript
interface User {
  id: string
  farcasterId?: string
  walletAddress?: string
  premiumFeatures: boolean
}
```

### API Integration

#### Base Minikit Storage
- **Purpose**: Offline data persistence and synchronization
- **Usage**: `window.minikit.storage.set/get/remove`
- **Fallback**: localStorage for development

#### Farcaster Identity
- **Purpose**: User authentication and identity verification
- **Integration**: `context.fid` from Base SDK
- **Usage**: Associate notes with verified Farcaster users

### User Flows

#### Capture New Insight
1. Tap '+' FAB on home screen
2. Enter optional title
3. Input content in text area
4. Add manual tags or use auto-suggestions
5. Optionally set reminder
6. Save (works offline)

#### Recall Saved Insight
1. Navigate to saved items screen
2. Browse or search by keywords/tags
3. Tap item to view details
4. Edit tags, reminder status
5. Return to list

#### Set Reminder
1. Choose time-based or contextual reminder
2. For time-based: Select date/time
3. For contextual: Define trigger condition
4. Save reminder

## Design System

### Color Palette
- **Background**: `hsl(220 20% 98%)`
- **Text**: `hsl(210 40% 15%)`
- **Accent**: `hsl(160 80% 50%)`
- **Primary**: `hsl(210 40% 30%)`
- **Surface**: `hsl(0 0% 100%)`

### Typography
- **Body**: `text-base font-normal leading-7`
- **Small**: `text-sm font-medium`
- **Display**: `text-4xl font-semibold`

### Spacing
- **Large**: `20px`
- **Medium**: `12px`
- **Small**: `8px`

### Border Radius
- **Large**: `16px`
- **Medium**: `10px`
- **Small**: `6px`

## Setup & Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Base account for deployment

### Installation
```bash
npm install
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Deployment
Deploy as a Base MiniApp following the Base documentation.

## Component Architecture

### Core Components
- **AppShell**: Main layout with navigation
- **NoteCard**: Display individual notes (preview/detail variants)
- **TagInput**: Tag management (editable/display variants)
- **ReminderSetter**: Reminder configuration (time/contextual variants)
- **FAB**: Floating action button for adding notes

### Pages
- **/**: Home page with note list and search
- **/new**: Create new note
- **/note/[id]**: View/edit individual note

## API Documentation

### Storage API
```typescript
// Get all items
const items = await getItems()

// Save item
await saveItem(item)

// Delete item
await deleteItem(itemId)

// Search items
const results = await searchItems(query, tagFilters)
```

### Smart Tagging
```typescript
// Generate tags from content
const tags = generateTags(content)
```

### User Management
```typescript
// Get current user
const user = await getUser()

// Save user data
await saveUser(userData)
```

## Future Enhancements

### Network Visualization
- Visual representation of note connections
- Relationship mapping between insights
- Pattern discovery features

### Advanced AI Features
- Enhanced smart tagging with LLM integration
- Content summarization
- Insight recommendations

### Social Features
- Share insights with Farcaster community
- Collaborative note-taking
- Public insight discovery

## Contributing

1. Follow the established design system
2. Maintain offline-first architecture
3. Ensure proper error handling
4. Add comprehensive comments for complex logic
5. Test offline functionality thoroughly

## License

MIT License - see LICENSE file for details.

