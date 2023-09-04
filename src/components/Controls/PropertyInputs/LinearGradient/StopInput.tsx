import { EventHandler } from '@state/events'
import { debounce } from '@utils'
import { DEFAULT_STOP_PROPS, GradientStopsType, getID } from './_helpers'
import { useEffect } from 'react'

const deHandler = debounce(EventHandler, 200)

const StopInput = ({
  index,
  stop,
  allStops,
  selectedLayer,
}: {
  index: number
  stop: GradientStopsType[2]
  allStops: GradientStopsType[]
  selectedLayer: string
}) => {
  const _id = getID(index)
  useEffect(() => {
    const _stop = document.querySelector<HTMLInputElement>(`#${_id}stop-1`)
    const _stop2 = document.querySelector<HTMLInputElement>(`#${_id}stop-2`)
    if (_stop)
      _stop.value = String(
        stop ?? Math.floor((100 / allStops.length) * (index + 1))
      )
    if (_stop2)
      _stop2.value = String(
        stop ?? Math.floor((100 / allStops.length) * (index + 1))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  if (Array.isArray(stop)) {
    return (
      <>
        <input
          id={_id + 'stop-1'}
          {...DEFAULT_STOP_PROPS}
          defaultValue={stop[0]}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'linear',
                  stops: allStops.map((s, i) =>
                    i === index
                      ? [s[0], s[1], [Number(e.target.value), stop[1]]]
                      : s
                  ),
                },
              },
            })
          }
        />
        <input
          id={_id + 'stop-2'}
          {...DEFAULT_STOP_PROPS}
          defaultValue={stop[1]}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'linear',
                  stops: allStops.map((s, i) =>
                    i === index
                      ? [s[0], s[1], [stop[0], Number(e.target.value)]]
                      : s
                  ),
                },
              },
            })
          }
        />
      </>
    )
  }
  return (
    <input
      id={_id + 'stop-1'}
      {...DEFAULT_STOP_PROPS}
      defaultValue={stop ?? Math.floor((100 / allStops.length) * (index + 1))}
      onChange={(e) =>
        deHandler({
          action: 'bkgd-update-layer',
          payload: {
            id: selectedLayer,
            type: 'gradient',
            props: {
              type: 'linear',
              stops: allStops.map((s, i) =>
                i === index ? [s[0], s[1], Number(e.target.value)] : s
              ),
            },
          },
        })
      }
    />
  )
}

export default StopInput
