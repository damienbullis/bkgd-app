import { useCallback, useMemo, useSyncExternalStore } from 'react'
import SubStore from './subStore'

const globalStore: { [key: string]: SubStore<unknown> } = {}

const createStore = <T>({ name, data }: { name: string; data: T }) => {
  globalStore[name] = new SubStore(data)

  return () => {
    const store = useMemo(() => globalStore[name] as SubStore<T>, [])

    const state = useSyncExternalStore<T>(store.subscribe2, store.value)

    const setter = useCallback<(state: T) => void>(
      (state) => store.publish(state),
      [store]
    )

    return [state, setter] as const
  }
}

const useVisible = createStore({
  name: 'Visible',
  data: false,
})

export { useLayer } from './Layer'
export { UI, useUI } from './UI'
