import { ReactNode, useEffect, useRef } from 'react'
import { KeyEventsContext, KeyboardEvents } from '.'
import { useRouter } from '@tanstack/router'

export default function KeysProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const keys = useRef(new KeyboardEvents())
  // Some actions will be handled here,

  useEffect(() => {
    const unsub = keys.current.subscribe((e) => {
      if (e.ctrlKey && e.key === 'z') {
        router.history.back()
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
        router.history.forward()
      }
    })

    return () => {
      unsub()
    }
  }, [keys, router])

  return (
    <KeyEventsContext.Provider value={keys.current}>
      {children}
    </KeyEventsContext.Provider>
  )
}
