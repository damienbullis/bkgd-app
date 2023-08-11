import { LayerEnum, LayerPropsType } from '@types'
import router from '../../router'
import { getStore } from '@state/global'
import { LayerType } from '../../components/Layers/LayerTypeSchema'
import { randomHex } from '@utils'

type EventHandlerType<T> = T extends infer U extends EventActionEnum
  ? {
      action: U
      payload: EventPayload<U>
    }
  : never

type EventPayload<T extends EventActionEnum> = T extends 'bkgd-add-layer'
  ? Pick<EventPayloadType, 'id' | 'type'>
  : T extends 'bkgd-remove-layer'
  ? { id: string }
  : T extends 'bkgd-update-layer'
  ? Pick<EventPayloadType, 'id'> & Partial<Omit<EventPayloadType, 'id'>>
  : T extends 'bkgd-update-stack'
  ? { id: string; direction: 'up' | 'down' }
  : T extends 'toggle-ui' | 'copy-css' | 'download-image' | 'save-bkgd'
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
  | 'bkgd-update-stack'
type EventsEnum =
  | 'toggle-ui'
  | 'save-bkgd'
  | 'load-bkgd'
  | 'delete-bkgd'
  | 'select-layer'
  | 'copy-css'
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
    case 'bkgd-update-stack':
      return 'Reorder Layers'
    default: {
      const _exhaustiveCheck: never = action
      return _exhaustiveCheck
    }
  }
}

function mwUpdateUIColors() {
  console.log('Updating UI Colors')
}

const triggerTitleUpdate = (event: EventHandlerType<BkgdEventsEnum>) => {
  const titleElement = document.querySelector('title')
  console.log('Updating Title')
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
  console.groupCollapsed('EVENT', event.action)
  updateState(event)
  console.groupEnd()
}

// #region Background Event Actions

const addSolidLayer = (id: string) => {
  const store = getStore<string>(1)
  const { layerStack = [], layerData = [] } =
    router.state.currentLocation.search

  store.set(id) // Set the selected layer to the new layer
  layerStack.unshift(id) // Add the new layer to the top of the stack
  layerData.push({
    id,
    type: 'solid',
    props: {
      color: randomHex(),
    },
  }) // Push data to end of array for compat with div stacking
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
const DEFAULT_COLOR = '#000000'

const DEFAULT_SOLID = {
  color: DEFAULT_COLOR,
} satisfies LayerPropsType<'solid'>['props']

const DEFAULT_GRADIENT = {
  type: 'linear',
  gradient: [[DEFAULT_COLOR, 0]],
} satisfies LayerPropsType<'gradient'>['props']

const DEFAULT_NOISE = {
  type: 'perlin',
  noise: 1,
} satisfies LayerPropsType<'noise'>['props']

const prepareNextLayer = (
  layer: LayerType,
  props?: EventPayload<'bkgd-update-layer'>
): LayerType => {
  if (layer.type === 'solid') {
    return {
      ...layer,
      ...props,
      props: {
        ...DEFAULT_SOLID,
        ...layer.props,
        ...props?.props,
      },
    } as LayerType
  } else if (layer.type === 'gradient') {
    return Object.assign({}, layer, {
      props: Object.assign({}, DEFAULT_GRADIENT, props),
    })
  } else if (layer.type === 'noise') {
    return Object.assign({}, layer, {
      props: Object.assign({}, DEFAULT_NOISE, props),
    })
  }
  return layer
}

const updateLayer = (event: EventHandlerType<'bkgd-update-layer'>) => {
  const { layerData = [], layerStack } = router.state.currentLocation.search
  let index = -1
  const layer = layerData.find((layer: LayerType, i) => {
    if (layer.id === event.payload.id) {
      index = i
      return true
    }
    return false
  })
  if (!layer) {
    console.error('Update Layer Error: Layer not found')
    return
  }
  const nextLayers = [...layerData]
  const nextLayer = prepareNextLayer(layer, event.payload)
  nextLayers[index] = nextLayer
  router.navigate({
    to: '/',
    search: {
      layerStack,
      layerData: nextLayers,
    },
  })
}

const updateStack = (event: EventHandlerType<'bkgd-update-stack'>) => {
  const { layerStack = [], layerData = [] } =
    router.state.currentLocation.search
  const index = layerStack.findIndex((id: string) => id === event.payload.id)
  if (index === -1) {
    console.error('Move Layer Error: Layer not found')
    return
  }

  const nextStack = [...layerStack]
  const nextLayer = nextStack.splice(index, 1)[0]
  if (event.payload.direction === 'up') {
    nextStack.splice(index - 1, 0, nextLayer)
  } else {
    nextStack.splice(index + 1, 0, nextLayer)
  }

  router.navigate({
    to: '/',
    search: {
      layerStack: nextStack,
      layerData,
    },
  })
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
      updateLayer(event)
      break
    }
    case 'bkgd-update-stack': {
      updateStack(event)
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
      console.log('Toggling UI')
      const ui = getStore<boolean>(0)
      ui.set(!ui.get())
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
      console.log('Selecting Layer')
      const selectedLayer = getStore<string>(1)
      const isSelected = selectedLayer.get() === event.payload.id
      selectedLayer.set(isSelected ? '' : event.payload.id)
      break
    }
    case 'copy-css': {
      console.warn('Copy CSS')
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
