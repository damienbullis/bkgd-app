import { LayerEnum, LayerPropsType } from '@types'
import router from '../../router'
import { getStore } from '@state/global'
import { randomHex } from '../../utils/colorHelpers'
import { LayerType } from '../../components/Layers/LayerTypeSchema'

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
  : T extends 'toggle-ui' | 'download-css' | 'download-image' | 'save-bkgd'
  ? null
  : T extends 'load-bkgd' | 'delete-bkgd' | 'select-layer'
  ? { id: string }
  : never

// (Pretty much) All events in the app are handled through the EventHandler.
type EventPayloadType = LayerPropsType<LayerEnum>

type EventActionEnum = BkgdEventsEnum | EventsEnum
type BkgdEventsEnum =
  | 'bkgd-add-layer'
  | 'bkgd-remove-layer'
  | 'bkgd-update-layer'
type EventsEnum =
  | 'toggle-ui'
  | 'save-bkgd'
  | 'load-bkgd'
  | 'delete-bkgd'
  | 'select-layer'
  | 'download-css'
  | 'download-image'

/**
 * These are only the events that are initiated by the user.
 */
export const EventHandler = (event: EventHandlerType<EventActionEnum>) => {
  if (event.action.includes('bkgd')) {
    handleMiddleware(event as EventHandlerType<BkgdEventsEnum>)
  } else {
    handleEvent(event as EventHandlerType<EventsEnum>)
  }
}

function getActionTitle(action: BkgdEventsEnum) {
  switch (action) {
    case 'bkgd-add-layer':
      return 'Add Layer'
    case 'bkgd-remove-layer':
      return 'Remove Layer'
    case 'bkgd-update-layer':
      return 'Update Layer'
    default: {
      const _exhaustiveCheck: never = action
      return _exhaustiveCheck
    }
  }
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
  console.group(`BKGD EVENT - (id: ${event.payload.id})`)
  try {
    triggerTitleUpdate(event)
    mwUpdateUIColors()
    updateBkgdState(event)
  } catch (error) {
    console.error(error)
  }
  console.groupEnd()
}

const handleEvent = (event: EventHandlerType<EventsEnum>) => {
  console.group('EVENT')
  updateState(event)
  console.groupEnd()
}

// #region Background Event Actions

const addSolidLayer = (id: string) => {
  const store = getStore<string>(1)
  const { layerStack = [], layerData = [] } =
    router.state.currentLocation.search

  store.set(id)
  layerStack.push(id)
  layerData.push({
    id,
    type: 'solid',
    props: {
      color: randomHex(),
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

const removeLayer = (id: string) => {
  const { layerStack = [], layerData = [] } =
    router.state.currentLocation.search

  const store = getStore<string>(1)
  const layerIsSelected = store.get() === id

  const nextStack = layerStack.filter((layerId: string) => layerId !== id)
  const nextData = layerData.filter((layer: LayerType) => layer.id !== id)

  router.navigate({
    to: '/',
    search: {
      layerStack: nextStack,
      layerData: nextData,
    },
  })
  if (layerIsSelected) {
    store.set('')
  }
}

//#endregion

//#region Event Control Switches

const addLayerSwitch = (event: EventHandlerType<'bkgd-add-layer'>): void => {
  const { id, type } = event.payload
  console.group(
    'Adding Layer ' + id + ' of type ' + type.replace(/-/g, ' ').toUpperCase()
  )
  switch (type) {
    case 'solid': {
      addSolidLayer(id)
      break
    }
    case 'gradient': {
      console.warn('Adding Gradient Layer')
      break
    }
    case 'noise': {
      console.warn('Adding Noise Layer')
      break
    }
    default: {
      const _exhaustiveCheck: never = type
      return _exhaustiveCheck
    }
  }
  console.groupEnd()
}

const updateBkgdState = (event: EventHandlerType<BkgdEventsEnum>): void => {
  console.group('Updating BKGD State')
  switch (event.action) {
    case 'bkgd-add-layer': {
      addLayerSwitch(event)
      break
    }
    case 'bkgd-remove-layer': {
      removeLayer(event.payload.id)
      break
    }
    case 'bkgd-update-layer': {
      console.warn('Updating Layer')
      break
    }
    default: {
      const _exhaust: never = event
      return _exhaust
    }
  }
  console.groupEnd()
}

const updateState = (event: EventHandlerType<EventsEnum>): void => {
  console.group('Updating State')
  switch (event.action) {
    case 'toggle-ui': {
      console.warn('Toggling UI Visibility')
      break
    }
    case 'save-bkgd': {
      console.warn('Saving Background')
      break
    }
    case 'load-bkgd': {
      console.warn('Loading Background')
      break
    }
    case 'delete-bkgd': {
      console.warn('Deleting Background')
      break
    }
    case 'select-layer': {
      console.warn('Selecting Layer')
      break
    }
    case 'download-css': {
      console.warn('Downloading CSS')
      break
    }
    case 'download-image': {
      console.warn('Downloading Image')
      break
    }
    default: {
      const _exhaust: never = event
      return _exhaust
    }
  }
  console.groupEnd()
}

//#endregion
