import { LayerEnum, LayerPropsType } from '@types'

// (Pretty much) All events in the app are handled through the EventHandler.
type EventPayloadType = {
  id: string
  props: Partial<LayerPropsType<LayerEnum>>
}

type EventPayload<T extends EventActionEnum> = T extends 'add-layer'
  ? Pick<EventPayloadType, 'id'>
  : T extends 'remove-layer'
  ? Pick<EventPayloadType, 'id'>
  : T extends 'update-layer'
  ? EventPayloadType
  : never

type EventActionEnum = 'add-layer' | 'remove-layer' | 'update-layer'

type EventHandlerType<T> = T extends infer U extends EventActionEnum
  ? {
      action: U
      payload: EventPayload<U>
    }
  : never

export const EventHandler = (event: EventHandlerType<EventActionEnum>) => {
  if (event.action.includes('bkgd')) {
    return () => handleMiddleware(event)
  }

  return () => handleEvent(event)
}

const handleMiddleware = (event: EventHandlerType<EventActionEnum>) => {
  console.log('With Middleware')
  updateState(event)
}

const handleEvent = (event: EventHandlerType<EventActionEnum>) => {
  console.log('Without Middleware')
  updateState(event)
}

const updateState = (event: EventHandlerType<EventActionEnum>) => {
  console.log('Updating State')
  console.log(event)
}
