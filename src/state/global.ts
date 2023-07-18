import { useCallback, useEffect, useState } from 'react'
import SubStore from './subStore'

const ActiveLayerID = new SubStore('')

const useLayerId = () => {
  const [layerId, setLayerId] = useState('')
  useEffect(() => {
    const [unsubscribe, initial] = ActiveLayerID.subscribe((id) =>
      setLayerId(id)
    )
    if (initial) {
      setLayerId(initial)
    }
    return () => unsubscribe()
  }, [])
  const setter = useCallback((id: string) => ActiveLayerID.publish(id), [])
  return [layerId, setter] as const
}

const Visible = new SubStore(true)

const Layer = {
  ActiveLayerID,
  Visible,
} as const

type Layer = typeof Layer
type LayerStore<T extends keyof Layer> = Layer[T]
type ValueType<T> = T extends SubStore<infer Value, infer _> ? Value : never

const useLayer = <
  T extends keyof Layer,
  U extends LayerStore<T>,
  V extends ValueType<U>
>(
  selector: T
) => {
  const [_state, setState] = useState<V>(Layer[selector].value() as V)
  useEffect(() => {
    const [unsubscribe] = Layer[selector].subscribe((state) =>
      setState(state as V)
    )
    return () => unsubscribe()
  }, [selector])

  const setter = useCallback<(data: V) => void>(
    (state) => (Layer[selector] as unknown as SubStore<V>).publish(state),
    [selector]
  )
  return [_state, setter] as const
}

const UI = {
  Visible,
}

export { Layer, UI, useLayerId, useLayer }
