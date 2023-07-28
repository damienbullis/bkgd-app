import { useEffect, useRef, useState } from 'react'
import SubStore from './subStore'

const globalStore: SubStore<unknown>[] = []

const createStoreHook = <T>(data: T) => {
  globalStore.push(new SubStore(data))
  return () => {
    // initialize store & setter
    const _ = useRef([
        globalStore[globalStore.length - 1] as SubStore<T>,
        (data: T) => {
          globalStore[globalStore.length - 1].set(data)
        },
      ] as const),
      // primary state
      [state, setState] = useState(_.current[0].get())

    // subscribe to store changes, and unsubscribe on unmount
    useEffect(() => () => _.current[0].subscribe(setState)(), [])

    // state & setter & store (for convenience)
    return [state, _.current[1], _.current[0]] as const
  }
}

// Transient state
const useVisible = createStoreHook(false)
const useSelectedLayer = createStoreHook('')

const useStore = <T>(index: number) =>
  useRef(globalStore[index] as SubStore<T>).current

export { useVisible, useSelectedLayer, useStore }
