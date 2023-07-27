import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SubStore from './subStore'

const globalStore: SubStore<unknown>[] = []

const createStore = <T>(data: T) => {
  globalStore.push(new SubStore(data))
  return () => {
    const store = useMemo(
        () => globalStore[globalStore.length - 1] as SubStore<T>,
        []
      ),
      setter = useCallback<(state: T) => void>(
        (state) => store.publish(state),
        [store]
      ),
      [state, setState] = useState(store.value())

    useEffect(() => () => store.subscribe(setState)(), [store])

    return [state, setter] as const
  }
}

// Transient state
const useVisible = createStore(false)
const useSelectedLayer = createStore('')

const useStore = <T>(index: number) =>
  useRef(globalStore[index] as SubStore<T>).current
const selectedLayerStore = globalStore[1]

export { useVisible, useSelectedLayer, useStore, selectedLayerStore }
