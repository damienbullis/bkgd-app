import { LayerEnum, LayerPropsType } from '@types'
import router from '../../router'

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
    return handleMiddleware(event as EventHandlerType<BkgdEventsEnum>)
  } else {
    return handleEvent(event as EventHandlerType<EventsEnum>)
  }
}

const triggerTitleUpdate = (event: EventHandlerType<BkgdEventsEnum>) => {
  let title = ''
  if (event.action === 'bkgd-add-layer') {
    title = `Add ${event.payload.type}`
  }
  if (event.action === 'bkgd-remove-layer') {
    title = `Remove Layer: ${event.payload.id}`
  }
  if (event.action === 'bkgd-update-layer') {
    title = `Update Layer: ${Object.keys(event.payload).join(', ')}`
  }
  const titleElement = document.querySelector('title')
  if (titleElement) {
    titleElement.innerHTML = title
  }
}

const handleMiddleware = (event: EventHandlerType<BkgdEventsEnum>) => {
  console.log('With Middleware')
  try {
    triggerTitleUpdate(event)
    updateState(event)
  } catch (error) {
    console.error(error)
  }
}

const handleEvent = (event: EventHandlerType<EventsEnum>) => {
  console.log('Without Middleware')
  updateState(event)
}

const addSolidLayer = (id: string) => {
  console.log('Adding Solid Layer')
  const { layerStack = [], layerData = [] } =
    router.state.currentLocation.search

  layerStack.push(id)
  layerData.push({
    id,
    type: 'solid',
    props: {
      color: 'pink',
    },
  })
  router.navigate({
    to: '/',
    search: {
      layerStack,
      layerData,
    },
  })
}

const updateState = (event: EventHandlerType<EventActionEnum>) => {
  console.log('Updating State')
  if (event.action === 'bkgd-add-layer') {
    const { id, type } = event.payload

    if (type === 'solid') {
      addSolidLayer(id)
    }
  }
}
