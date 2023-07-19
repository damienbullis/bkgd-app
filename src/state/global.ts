import { useCallback, useEffect, useMemo, useState } from 'react'
import SubStore from './subStore'

const globalStore: SubStore<unknown>[] = []

const createStore = <T>(data: T) => {
  globalStore.push(new SubStore(data))

  return function () {
    const store = useMemo(
      () => globalStore[globalStore.length - 1] as SubStore<T>,
      []
    )

    const [state, setState] = useState(store.value())
    useEffect(() => {
      const unsubscribe = store.subscribe(setState)
      return () => unsubscribe()
    }, [store])

    const setter = useCallback<(state: T) => void>(
      (state) => store.publish(state),
      [store]
    )

    return [state, setter] as const
  }
}

const useVisible = createStore(false)
const useSelectedLayer = createStore('')

export { useVisible, useSelectedLayer }
