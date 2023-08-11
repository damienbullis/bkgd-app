import { useEffect, useRef, useState } from 'react'
import SubStore from './subStore'

const globalStore: SubStore<unknown>[] = []

/**
 * React wrapper for a SubStore
 *
 * This is a convenience function for creating a SubStore and subscribing to it,
 * and hooking into React's lifecycle to ensure that the subscription is
 * unsubscribed when the component is unmounted.
 *
 * @param data Initial data for the store
 */
function createStoreHook<T>(data: T) {
  globalStore.push(new SubStore(data))
  const index = globalStore.length - 1
  return function () {
    // initialize store & setter
    const [state, setState] = useState(globalStore[index].get())

    // subscribe to store changes, and unsubscribe on unmount
    useEffect(() => {
      const unsub = globalStore[index].subscribe(setState)
      return () => {
        unsub()
      }
    }, [])

    // state & setter & store (for convenience)
    return [
      state,
      (data: T) => globalStore[index].set(data),
      globalStore[index],
    ] as const
  }
}

// Transient state
const useVisible = createStoreHook(false)
const useSelectedLayer = createStoreHook('')

// Helpers
const useStore = <T>(index: number) =>
  useRef(globalStore[index] as SubStore<T>).current

const getStore = <T>(index: number) => globalStore[index] as SubStore<T>

export { useVisible, useSelectedLayer, useStore, getStore }
