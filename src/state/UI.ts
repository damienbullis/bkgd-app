import { useCallback, useEffect, useMemo, useState } from 'react'
import SubStore from './subStore'

const Visible = new SubStore(true)

const UI = {
  Visible,
} as const

type UI = typeof UI
type UIStore<T extends keyof UI> = UI[T]

const useUI = <Key extends keyof UI>(selector: Key) => {
  const store = useMemo(() => UI[selector], [selector])

  const [_state, setState] = useState(store.value())

  useEffect(() => {
    const [unsubscribe] = store.subscribe((state) => setState(state))
    return () => unsubscribe()
  }, [selector, store])

  const setter = useCallback<UIStore<Key>['publish']>(
    (state) => store.publish(state),
    [store]
  )

  return [_state, setter] as const
}

export { UI, useUI }
