import { useEffect, useRef, useState } from 'react'
import SubStore from './subStore'

const globalStore: SubStore<unknown>[] = []

const createStore = <T>(data: T) => {
  globalStore.push(new SubStore(data))
  return () => {
    // initialize store & setter
    const _ = useRef([
        globalStore[globalStore.length - 1] as SubStore<T>,
        (data: T) => {
          globalStore[globalStore.length - 1].publish(data)
        },
      ] as const),
      // primary state
      [state, setState] = useState(_.current[0].value())

    // subscribe to store changes, and unsubscribe on unmount
    useEffect(() => () => _.current[0].subscribe(setState)(), [])

    // state & setter & store (for convenience)
    return [state, _.current[1], _.current[0]] as const
  }
}

// Transient state
const useVisible = createStore(false)
const useSelectedLayer = createStore('')

const useStore = <T>(index: number) =>
  useRef(globalStore[index] as SubStore<T>).current
const selectedLayerStore = globalStore[1]

export { useVisible, useSelectedLayer, useStore, selectedLayerStore }
