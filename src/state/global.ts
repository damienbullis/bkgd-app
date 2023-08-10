import { useEffect, useRef, useState } from 'react'
import SubStore from './subStore'

const globalStore: SubStore<unknown>[] = []

function createStoreHook<T>(data: T) {
  globalStore.push(new SubStore(data))
  const index = globalStore.length - 1
  return function () {
    // initialize store & setter
    const _ = useRef([
        globalStore[index] as SubStore<T>,
        (data: T) => {
          globalStore[index].set(data)
        },
      ] as const),
      // primary state
      [state, setState] = useState(_.current[0].get())

    // subscribe to store changes, and unsubscribe on unmount
    useEffect(() => {
      const unsub = _.current[0].subscribe(setState)
      return () => {
        unsub()
      }
    }, [])

    // state & setter & store (for convenience)
    return [state, _.current[1], _.current[0]] as const
  }
}

// Transient state
const useVisible = createStoreHook(false)
const useSelectedLayer = createStoreHook('')

const useStore = <T>(index: number) =>
  useRef(globalStore[index] as SubStore<T>).current

const getStore = <T>(index: number) => globalStore[index] as SubStore<T>

export { useVisible, useSelectedLayer, useStore, getStore }
