import { ReactNode, useState } from 'react'
import { ModalContext } from '.'

export default function ModalProvider({
  children,
  initialState = false,
}: {
  children: ReactNode
  initialState?: boolean
}) {
  const state = useState(initialState)

  return <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
}
