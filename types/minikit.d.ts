// Base Minikit type declarations
declare global {
  interface Window {
    minikit?: {
      storage: {
        get: (key: string) => Promise<string | null>
        set: (key: string, value: string) => Promise<void>
        remove: (key: string) => Promise<void>
      }
    }
  }
}

export {}

