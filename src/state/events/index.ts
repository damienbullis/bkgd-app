import { getStore } from '@state/global'
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
    return () => handleMiddleware(event as EventHandlerType<BkgdEventsEnum>)
  } else {
    return () => handleEvent(event as EventHandlerType<EventsEnum>)
  }
}

const buildPropsFromType = <T extends LayerEnum>(type: T) => {
  switch (type) {
    case 'solid':
      return {
        type: type,
        props: {
          color: 'pink',
        },
      } satisfies Partial<LayerPropsType<'solid'>>
    case 'gradient':
      return {
        type: 'gradient',
        props: {
          gradient: [
            ['pink', 0],
            ['hotpink', 1],
          ],
          type: 'linear',
        },
      } satisfies Partial<LayerPropsType<'gradient'>>
    case 'noise':
      return {
        type: 'noise',
        props: {
          noise: 0.5,
          type: 'turbulence',
        },
      } satisfies Partial<LayerPropsType<'noise'>>
    default:
      throw new Error('Invalid Layer Type')
  }
}

const handleMiddleware = (event: EventHandlerType<BkgdEventsEnum>) => {
  console.log('With Middleware')

  // if (event.action === 'bkgd-remove-layer') {
  // }
  // if (event.action === 'bkgd-update-layer') {
  // }
  updateState(event)
}

const handleEvent = (event: EventHandlerType<EventsEnum>) => {
  console.log('Without Middleware')
  updateState(event)
}

const updateState = (event: EventHandlerType<EventActionEnum>) => {
  console.log('Updating State')
  if (event.action === 'bkgd-add-layer') {
    const { id, type } = event.payload
    console.log({ id, type })
    const props = buildPropsFromType(type)
    router.navigate({
      to: '/',
      search: {
        layerStack: [id],
        layerData: [
          {
            id,
            ...props,
          },
        ],
      },
    })
  }
}
