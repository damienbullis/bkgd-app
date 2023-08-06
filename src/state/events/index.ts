import { LayerEnum, LayerPropsType } from '@types'
import router from '../../router'
import { getStore } from '@state/global'

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

function getActionTitle(action: EventActionEnum) {
  let title: string = action
  if (action.startsWith('bkgd')) {
    title = action.replace('bkgd-', '')
  }
  return title.replace(/-/g, ' ').toLocaleUpperCase()
}

function mwUpdateUIColors() {
  console.log('Background Color Changed\nUpdating UI Colors to match')
}

const triggerTitleUpdate = (event: EventHandlerType<BkgdEventsEnum>) => {
  const titleElement = document.querySelector('title')
  if (titleElement) {
    const title = getActionTitle(event.action)
    titleElement.innerHTML = title
  }
}

const handleMiddleware = (event: EventHandlerType<BkgdEventsEnum>) => {
  console.log('With Middleware LayerID: ', event.payload.id)
  try {
    triggerTitleUpdate(event)
    mwUpdateUIColors()
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
  const store = getStore<string>(1)
  console.log('Adding Solid Layer')
  const { layerStack = [], layerData = [] } =
    router.state.currentLocation.search

  store.set(id)
  layerStack.push(id)
  layerData.push({
    id,
    type: 'solid',
    props: {
      color: 'pink', // TODO: make random
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
