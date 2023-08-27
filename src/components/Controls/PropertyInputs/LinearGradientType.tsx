import { GradientLayerType } from 'src/components/Layers/LayerTypeSchema'
import { debounce, hslToHex, randomHex, rgbToHex } from '@utils'
import { EventHandler } from '@state/events'
import {
  CircleDashed,
  CrosshairSimple,
  MinusSquare,
  PaintBucket,
  PlusSquare,
} from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'

const deHandler = debounce(EventHandler, 200)

type LinearGradientPropsType = GradientLayerType['props'] & { type: 'linear' }
type GradientStopsType = Exclude<LinearGradientPropsType['stops'], undefined>[0]

const transformColorValue = (color: GradientStopsType[0]) => {
  if (typeof color === 'string') {
    return color
  } else {
    if ('r' in color) {
      return rgbToHex(color)
    } else {
      return hslToHex(color)
    }
  }
}

const LinearGradientStops = ({
  stops = [],
  selectedLayer,
}: {
  stops: GradientStopsType[]
  selectedLayer: string
}) => {
  return (
    <div className="flex w-full flex-col items-stretch justify-start">
      <div className="flex w-full flex-row items-center justify-between">
        <button
          onClick={() =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'linear',
                  stops: stops.concat([randomHex(), null, null]),
                },
              },
            })
          }
        >
          Add Stop
        </button>
      </div>
      {stops.map(([color, opacity, stop], i) => (
        <GradientStop
          key={i}
          index={i}
          color={color}
          opacity={opacity}
          stop={stop}
          allStops={stops}
          selectedLayer={selectedLayer}
        />
      ))}
    </div>
  )
}

const getID = (index: number) => `gradient-stop-${index}-` as const

const GradientStop = ({
  index,
  color,
  opacity,
  stop,
  allStops,
  selectedLayer,
}: {
  index: number
  color: GradientStopsType[0]
  opacity: GradientStopsType[1]
  stop: GradientStopsType[2]
  allStops: GradientStopsType[]
  selectedLayer: string
}) => {
  const prevSelectedLayer = useRef(selectedLayer)
  const isArr = Array.isArray(stop)
  const _pos = Math.floor((100 / allStops.length) * (index + 1))

  useEffect(() => {
    if (prevSelectedLayer.current !== selectedLayer) {
      prevSelectedLayer.current = selectedLayer
      const _id = getID(index)
      const _color = document.querySelector<HTMLInputElement>(`#${_id}color`)
      const _opacity = document.querySelector<HTMLInputElement>(
        `#${_id}opacity`
      )

      if (_color) _color.value = transformColorValue(color)
      if (_opacity) _opacity.value = String(opacity ?? 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between">
        <h5>Stop {index + 1}</h5>
        <PaintBucket />
        <input
          id={getID(index) + 'color'}
          className="h-8 w-8 appearance-none overflow-hidden rounded-full
          [&::-webkit-color-swatch-wrapper]:border-0
          [&::-webkit-color-swatch-wrapper]:p-0
          [&::-webkit-color-swatch]:border-0
          [&::-webkit-color-swatch]:outline-0
          "
          type="color"
          defaultValue={transformColorValue(color)}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'linear',
                  stops: allStops.map((s, i) =>
                    i === index ? [e.target.value, s[1], s[2]] : s
                  ),
                },
              },
            })
          }
        />
      </div>
      <label>Opacity</label>
      <button>
        <CircleDashed size={'1em'} />
      </button>
      <input
        id={getID(index) + 'opacity'}
        type="range"
        defaultValue={opacity ?? 100}
        min={0}
        max={100}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type: 'linear',
                stops: allStops.map((s, i) =>
                  i === index ? [s[0], Number(e.target.value), s[2]] : s
                ),
              },
            },
          })
        }
      />
      <label className="my-2 flex flex-row flex-nowrap items-baseline">
        Position
        <button>
          <CrosshairSimple size={'1em'} />
        </button>
        <span className="ml-auto inline-flex flex-row items-center">
          <span className="mr-2">
            {isArr ? stop.join('%, ') : stop ?? _pos}%
          </span>
          {isArr ? (
            <button
              onClick={() =>
                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    type: 'gradient',
                    props: {
                      type: 'linear',
                      stops: allStops.map((s, i) =>
                        i === index ? [s[0], s[1], _pos] : s
                      ),
                    },
                  },
                })
              }
            >
              <MinusSquare />
            </button>
          ) : (
            <button
              onClick={() =>
                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    type: 'gradient',
                    props: {
                      type: 'linear',
                      stops: allStops.map((s, i) =>
                        i === index ? [s[0], s[1], [_pos, _pos]] : s
                      ),
                    },
                  },
                })
              }
            >
              <PlusSquare size={'2em'} className="mb-1" />
            </button>
          )}
        </span>
      </label>
      <StopInput
        stop={stop}
        selectedLayer={selectedLayer}
        index={index}
        allStops={allStops}
      />
    </>
  )
}

const DEFAULT_STOP_PROPS = {
  type: 'range',
  min: -100,
  max: 200,
  step: 5,
}

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

const LinearGradientType = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: LinearGradientPropsType
  selectedLayer: string
}) => {
  const { deg, colorSpace, repeating, stops } = typeProps
  useEffect(() => {
    const _deg = document.querySelector<HTMLInputElement>('#degrees')
    const _oklab =
      document.querySelector<HTMLInputElement>('#color-space-oklab')
    const _Oklch =
      document.querySelector<HTMLInputElement>('#color-space-Oklch')
    const _repeating = document.querySelector<HTMLInputElement>('#repeating')
    if (_deg) _deg.value = String(deg)
    if (_oklab) _oklab.checked = colorSpace !== 'Oklch'
    if (_Oklch) _Oklch.checked = colorSpace === 'Oklch'
    if (_repeating) _repeating.checked = repeating || false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])
  return (
    <>
      <label className="w-full">Degrees</label>
      <input
        id="degrees"
        type="range"
        defaultValue={deg}
        min={1}
        max={360}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type: 'linear',
                deg: Number(e.target.value),
              },
            },
          })
        }
      />
      <LinearGradientStops stops={stops || []} selectedLayer={selectedLayer} />
      <label>
        Color Space
        <br />
        <span>
          oklab
          <input
            type="radio"
            id="color-space-oklab"
            defaultChecked={colorSpace !== 'Oklch'}
            onChange={() => {
              const el =
                document.querySelector<HTMLInputElement>('#color-space-Oklch')
              if (el) el.checked = false
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'linear',
                    colorSpace: 'oklab',
                    stops,
                  },
                },
              })
            }}
          />
        </span>
        <span>
          oklch
          <input
            type="radio"
            id="color-space-Oklch"
            defaultChecked={colorSpace === 'Oklch'}
            onChange={() => {
              const el =
                document.querySelector<HTMLInputElement>('#color-space-oklab')
              if (el) el.checked = false
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'linear',
                    colorSpace: 'Oklch',
                    stops,
                  },
                },
              })
            }}
          />
        </span>
      </label>

      <label>Repeating</label>
      <input
        type="checkbox"
        id="repeating"
        defaultChecked={repeating}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type: 'linear',
                repeating: e.target.checked,
              },
            },
          })
        }
      />
    </>
  )
}

export default LinearGradientType
