import { LayerEnum, LayerPropsType } from '@types'
import router from '../../router'
import { getStore } from '@state/global'
import {
  GradientLayerType,
  LayerType,
  NoiseLayerType,
  SolidLayerType,
} from '@types'
import { randomHex } from '@utils'
import { Bkgd, bkgdsSchema } from '../../types/BkgdTypes'

type EventHandlerType<T> = T extends infer U extends EventActionEnum
  ? {
      action: U
      payload: EventPayload<U>
    }
  : never

type EventPayload<T extends EventActionEnum> = T extends 'bkgd-add-layer'
  ? {
      id: string
      type: LayerEnum
      props: { type: 'linear' | 'radial' | 'conic' | undefined }
    }
  : T extends 'bkgd-remove-layer' | 'select-layer'
  ? { id: string }
  : T extends 'bkgd-update-layer'
  ? { id: string } & Partial<EventPayloadType>
  : T extends 'bkgd-dupe-layer'
  ? { id: string } & EventPayloadType
  : T extends 'bkgd-update-stack'
  ? { id: string; direction: 'up' | 'down' } | { stack: string[] }
  : T extends 'save-bkgd' | 'load-bkgd' | 'delete-bkgd'
  ? { bkgd: Bkgd }
  : T extends 'toggle-ui' | 'copy-css' | 'download-image'
  ? null
  : never

// (Pretty much) All events in the app are handled through the EventHandler.
type EventPayloadType = LayerPropsType<LayerEnum>

type EventActionEnum = BkgdEventsEnum | EventsEnum
type BkgdEventsEnum =
  | 'bkgd-add-layer'
  | 'bkgd-dupe-layer'
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
export function EventHandler(event: EventHandlerType<EventActionEnum>) {
  if (event.action.startsWith('bkgd')) {
    handleMiddleware(event as EventHandlerType<BkgdEventsEnum>)
  } else {
    handleEvent(event as EventHandlerType<EventsEnum>)
  }
}

function getActionTitle(action: BkgdEventsEnum) {
  switch (action) {
    case 'bkgd-add-layer':
    case 'bkgd-dupe-layer':
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
  try {
    triggerTitleUpdate(event)
    mwUpdateUIColors()
    updateBkgdState(event)
  } catch (error) {
    console.error(error)
  }
}

const handleEvent = (event: EventHandlerType<EventsEnum>) => {
  console.groupCollapsed('EVENT', event.action)
  updateState(event)
  console.groupEnd()
}

const downloadImage = () => {
  const el = document.querySelector<HTMLElement>('#bkgd')
  if (el) {
    // Copy the computed styles of the target element
    const computedStyles = getComputedStyle(el)

    // Create a new tab with a specific size (1600px x 900px)
    const newTab = window.open('', '_blank')
    if (newTab) {
      // Create a new element in the new tab and apply copied styles
      const newElement = document.createElement('div')
      // add a way to configure this width & height?
      newElement.style.width = '1600px'
      newElement.style.height = '900px'
      newElement.style.background = computedStyles.background
      newElement.style.backgroundImage = computedStyles.backgroundImage
      newElement.style.backgroundSize = computedStyles.backgroundSize
      newElement.style.backgroundPosition = computedStyles.backgroundPosition
      newElement.style.backgroundRepeat = computedStyles.backgroundRepeat
      newElement.style.backgroundBlendMode = computedStyles.backgroundBlendMode

      // Append the new element to the new tab's document
      newTab.document.body.appendChild(newElement)
    }
  }
}

// #region Background Event Actions

const removeLayer = (_id: string) => {
  const prevSearch = router.state.currentLocation.search

  const store = getStore<string>(1)
  const layerIsSelected = store.get() === _id

  const nextStack = prevSearch.layerStack?.filter(
    (layerId: string) => layerId !== _id
  )
  const nextData = prevSearch.layerData?.filter(
    (layer: LayerType) => layer.id !== _id
  )
  prevSearch.layerStack = nextStack
  prevSearch.layerData = nextData

  router.navigate({
    to: '/',
    search: prevSearch,
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
} satisfies LayerPropsType<'gradient'>['props']

const DEFAULT_NOISE = {
  type: 'turbulence',
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
    return {
      ...layer,
      ...props,
      props: {
        ...DEFAULT_GRADIENT,
        ...layer.props,
        ...props?.props,
      },
    } as LayerType
  } else if (layer.type === 'noise') {
    return {
      ...layer,
      ...props,
      props: {
        ...DEFAULT_NOISE,
        ...layer.props,
        ...props?.props,
      },
    } as LayerType
  }
  return layer
}

const updateLayer = (event: EventHandlerType<'bkgd-update-layer'>) => {
  const search = router.state.currentLocation.search
  console.log('Updating Layer', { event })
  let index = -1
  const layer = search.layerData?.find((layer: LayerType, i) => {
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
  const nextLayers = [...(search.layerData || [])]
  const nextLayer = prepareNextLayer(layer, event.payload)
  nextLayers[index] = nextLayer
  router.navigate({
    to: '/',
    search: {
      ...search,
      layerData: nextLayers,
    },
  })
}

const updateStack = (event: EventHandlerType<'bkgd-update-stack'>) => {
  if ('stack' in event.payload) {
    const search = router.state.currentLocation.search
    if (event.payload.stack.length !== search.layerStack?.length) {
      router.navigate({
        to: '/',
        search: {
          ...search,
          layerStack: event.payload.stack,
        },
      })
      return
    }

    for (let i = 0; i < event.payload.stack.length; i++) {
      if (event.payload.stack[i] !== search.layerStack?.[i]) {
        router.navigate({
          to: '/',
          search: {
            ...search,
            layerStack: event.payload.stack,
          },
        })
        return
      }
    }
  } else {
    const _id = event.payload.id
    const search = router.state.currentLocation.search
    const index = search.layerStack?.findIndex((id: string) => id === _id)
    if (index === -1 || index === undefined) {
      console.error('Move Layer Error: Layer not found')
      return
    }

    const nextStack = [...(search.layerStack || [])]
    const nextLayer = nextStack.splice(index, 1)[0]
    if (event.payload.direction === 'up') {
      nextStack.splice(index - 1, 0, nextLayer)
    } else {
      nextStack.splice(index + 1, 0, nextLayer)
    }

    router.navigate({
      to: '/',
      search: {
        ...search,
        layerStack: nextStack,
      },
    })
  }
}

const loadBkgd = (bkgd: Bkgd) => {
  router.navigate({
    to: '/',
    search: {
      id: bkgd.id,
      ...bkgd.layers,
    },
  })
}

const buildLayerData = (e: EventHandlerType<'bkgd-add-layer'>) => {
  const { id, type, props } = e.payload
  switch (type) {
    case 'solid': {
      return {
        id,
        type: 'solid',
        props: {
          color: randomHex(),
        },
      } satisfies SolidLayerType
    }
    case 'gradient': {
      return {
        id,
        type: 'gradient',
        props: {
          type: props.type || 'linear',
          stops: [
            [randomHex(), null, null],
            [randomHex(), null, null],
          ],
        },
      } satisfies GradientLayerType
    }
    case 'noise': {
      return {
        id,
        type: 'noise',
        props: {
          type: 'turbulence',
        },
      } satisfies NoiseLayerType
    }
    default: {
      const _exhaustiveCheck: never = type
      return _exhaustiveCheck
    }
  }
}

const addLayer = (event: EventHandlerType<'bkgd-add-layer'>): void => {
  const { id, type } = event.payload
  console.info(
    'Adding Layer ' + id + ' of type ' + type.replace(/-/g, ' ').toUpperCase()
  )

  const store = getStore<string>(1)
  const search = router.state.currentLocation.search
  const layerStack = search.layerStack || []
  const layerData = search.layerData || []

  store.set(id) // Set the selected layer to the new layer
  layerStack.unshift(id) // Add the new layer to the top of the stack
  layerData.push(buildLayerData(event))
  router.navigate({
    to: '/',
    search: {
      ...search,
      layerStack,
      layerData,
    },
  })
}
const dupeLayer = (event: EventHandlerType<'bkgd-dupe-layer'>): void => {
  const { id } = event.payload
  console.info('Duplicating Layer ' + id)

  const store = getStore<string>(1)
  const search = router.state.currentLocation.search
  const layerStack = search.layerStack || []
  const layerData = search.layerData || []
  const copyId = id + '-copy'
  const currIndex = layerStack.findIndex((layerId) => layerId === id)
  store.set(copyId) // Set the selected layer to the new layer
  layerStack.splice(currIndex + 1, 0, copyId)
  layerData.push({ ...event.payload, id: copyId } as LayerType)
  router.navigate({
    to: '/',
    search: {
      ...search,
      layerStack,
      layerData,
    },
  })
}

//#endregion

//#region Event Control Switches

const updateBkgdState = (event: EventHandlerType<BkgdEventsEnum>): void => {
  console.group('Updating BKGD State')
  switch (event.action) {
    case 'bkgd-add-layer': {
      addLayer(event)
      break
    }
    case 'bkgd-dupe-layer': {
      dupeLayer(event)
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
const updateBkgdCount = () => {
  const store = getStore<number>(2)
  const bkgdCount = store.get()
  store.set(bkgdCount + 1)
  console.log('Updating Background Count to ' + (bkgdCount + 1))
}

const storageAction = (action: 'save' | 'delete', bkgd: Bkgd) => {
  const storage = localStorage.getItem('bkgds') ?? '[]'
  const bkgds = bkgdsSchema.parse(JSON.parse(storage))
  let nextBkgds: Bkgd[] = []
  if (action === 'save') {
    const bkgdExists = bkgds.findIndex((b) => b.id === bkgd.id)
    if (bkgdExists !== -1) {
      nextBkgds[bkgdExists] = bkgd
    } else {
      nextBkgds = [...bkgds, bkgd]
    }
  } else if (action === 'delete') {
    nextBkgds = bkgds.filter((b) => b.id !== bkgd.id)
  }
  try {
    localStorage.setItem('bkgds', JSON.stringify(nextBkgds))
  } catch (error) {
    console.error(error)
  }
}

const toggleUI = () => {
  const ui = getStore<boolean>(0)
  ui.set(!ui.get())
}

const copyCSS = () => {
  const el = document.querySelector<HTMLElement>('#bkgd')
  if (el) {
    navigator.clipboard.writeText(
      `.bkgd {
  ${el.style.cssText}
}`
    )
  }
}

const selectLayer = (id: string) => {
  const selectedLayer = getStore<string>(1)
  const isSelected = selectedLayer.get() === id
  selectedLayer.set(isSelected ? '' : id)
}

const updateState = (event: EventHandlerType<EventsEnum>): void => {
  console.group('Updating State')
  switch (event.action) {
    case 'toggle-ui': {
      toggleUI()
      break
    }
    case 'save-bkgd': {
      updateBkgdCount()
      storageAction('save', event.payload.bkgd)
      break
    }
    case 'load-bkgd': {
      updateBkgdCount()
      loadBkgd(event.payload.bkgd)
      break
    }
    case 'delete-bkgd': {
      updateBkgdCount()
      storageAction('delete', event.payload.bkgd)
      break
    }
    case 'select-layer': {
      selectLayer(event.payload.id)
      break
    }
    case 'copy-css': {
      copyCSS()
      break
    }
    case 'download-image': {
      downloadImage()
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
