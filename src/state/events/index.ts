import { LayerEnum, LayerPropsType } from '@types'

type EventHandlerType<T> = T extends infer U extends EventActionEnum
  ? {
      action: U
      payload: EventPayload<U>
    }
  : never

type EventPayload<T extends EventActionEnum> = T extends 'bkgd-add-layer'
  ? Pick<EventPayloadType, 'id' | 'type'>
  : T extends 'bkgd-remove-layer'
  ? Pick<EventPayloadType, 'id'>
  : T extends 'bkgd-update-layer'
  ? Pick<EventPayloadType, 'id'> & Partial<Omit<EventPayloadType, 'id'>>
  : never

// (Pretty much) All events in the app are handled through the EventHandler.
type EventPayloadType = LayerPropsType<LayerEnum>

type EventActionEnum = BkgdEventsEnum | EventsEnum
type BkgdEventsEnum =
  | 'bkgd-add-layer'
  | 'bkgd-remove-layer'
  | 'bkgd-update-layer'
type EventsEnum = 'toggle-ui-visibility'

export const EventHandler = (event: EventHandlerType<EventActionEnum>) => {
  if (event.action.includes('bkgd')) {
    return () => handleMiddleware(event as EventHandlerType<BkgdEventsEnum>)
  } else {
    return () => handleEvent(event as EventHandlerType<EventsEnum>)
  }
}

const handleMiddleware = (event: EventHandlerType<BkgdEventsEnum>) => {
  console.log('With Middleware')
  updateState(event)
}

const handleEvent = (event: EventHandlerType<EventsEnum>) => {
  console.log('Without Middleware')
  updateState(event)
}

const updateState = (event: EventHandlerType<EventActionEnum>) => {
  console.log('Updating State')
  console.log(event)
}
