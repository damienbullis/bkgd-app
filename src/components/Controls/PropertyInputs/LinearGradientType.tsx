import { GradientLayerType } from 'src/components/Layers/LayerTypeSchema'
import { debounce, hslToHex, randomHex, rgbToHex } from '@utils'
import { EventHandler } from '@state/events'
import {
  ArrowsCounterClockwise,
  CircleDashed,
  CrosshairSimple,
  MinusSquare,
  PaintBucket,
  PlusCircle,
  PlusSquare,
} from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import styles from './GradientType.module.css'

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
                  stops: [...stops, [randomHex(), null, null]],
                },
              },
            })
          }
        >
          <PlusCircle />
        </button>
      </div>
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
    <div className="flex w-full flex-row flex-wrap items-center">
      <div className="mr-4 flex items-center justify-start gap-2">
        <h5>{index + 1}</h5>
        <div className="relative flex cursor-pointer">
          <div className="bottom pointer-events-none absolute inset-0 z-10 flex place-content-center place-items-center">
            <PaintBucket className="pointer-events-none text-xl" />
          </div>
          <input
            id={getID(index) + 'color'}
            className="h-8 w-8 cursor-pointer appearance-none overflow-hidden rounded-full
          [&::-webkit-color-swatch-wrapper]:border-0
          [&::-webkit-color-swatch-wrapper]:p-0
          [&::-webkit-color-swatch]:border-0
          [&::-webkit-color-swatch]:outline-0"
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
      </div>
      <div
        id={getID(index) + 'opacity-wrap'}
        data-active={false}
        onClick={() => {
          const curr = document.querySelector<HTMLDivElement>(
            `#${getID(index)}opacity-wrap`
          )
          if (curr) {
            curr.dataset.active =
              curr.dataset.active === 'true' ? 'false' : 'true'
          }
        }}
        className="group mr-4 flex cursor-pointer items-center justify-start gap-2"
      >
        <CircleDashed />
        <span className="relative p-1 text-white">
          {opacity ?? 100}%
          <input
            className="pointer-events-none absolute left-1/2 top-full z-10 min-w-[100px] 
            -translate-x-1/2 translate-y-full scale-50 opacity-0 transition-all
            before:absolute before:-inset-1
            before:z-[-1] before:rounded before:bg-white before:shadow-md 
            group-data-[active='true']:pointer-events-auto group-data-[active='true']:translate-y-0 group-data-[active='true']:scale-100 group-data-[active='true']:opacity-100"
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
        </span>
      </div>
      <div className="flex cursor-pointer flex-row items-center justify-start">
        <CrosshairSimple />
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
              <MinusSquare size={'1em'} />
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
              <PlusSquare size={'1em'} />
            </button>
          )}
        </span>
      </div>
      <StopInput
        stop={stop}
        selectedLayer={selectedLayer}
        index={index}
        allStops={allStops}
      />
    </div>
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
    <div className={styles.wrap}>
      <div className="mb-2 flex w-full flex-row items-center justify-between">
        <div className="inline-flex items-center">
          <label>Angle</label>
          <div
            id="degrees-wrap"
            className="group relative mx-4 flex cursor-pointer flex-row items-center"
            data-active={false}
            onClick={(e) => {
              const curr = e.target as HTMLDivElement
              if (curr.dataset.active) {
                curr.dataset.active =
                  curr.dataset.active === 'true' ? 'false' : 'true'
              }
            }}
          >
            {deg || 360}°
            <input
              id="degrees"
              type="range"
              defaultValue={deg || 360}
              min={1}
              max={360}
              className="pointer-events-none absolute left-1/2 top-full z-10 min-w-[100px] 
                -translate-x-1/2 scale-50 opacity-0 transition-all
                before:absolute before:-inset-1 before:z-[-1] 
                before:rounded before:bg-white before:shadow-md
                group-data-[active='true']:pointer-events-auto group-data-[active='true']:scale-100
                group-data-[active='true']:opacity-100"
              onChange={(e) => {
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
              }}
            />
          </div>
        </div>
        <div
          className="flex cursor-pointer flex-row items-center justify-end"
          onClick={() =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'linear',
                  repeating: !repeating,
                },
              },
            })
          }
        >
          <label>Repeating</label>
          <ArrowsCounterClockwise
            size={'1.25em'}
            className={
              'ml-2 hover:scale-105 focus:scale-95 active:scale-95 ' +
              (repeating === true ? 'text-fuchsia-500' : '')
            }
          />
        </div>
      </div>
      <div
        data-color-space={colorSpace}
        className="group flex w-full flex-row items-center justify-start gap-2"
      >
        <label>Color Space</label>
        <span
          className="cursor-pointer text-sm
          group-data-[color-space='oklab']:text-white
          group-data-[color-space='undefined']:text-gray-500
          group-data-[color-space='oklab']:underline"
          onClick={() => {
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'linear',
                  colorSpace: 'oklab',
                },
              },
            })
          }}
        >
          oklab
        </span>
        <span
          className="cursor-pointer text-sm
          group-data-[color-space='Oklch']:text-white
          group-data-[color-space='undefined']:text-gray-500
          group-data-[color-space='Oklch']:underline"
          onClick={() => {
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'linear',
                  colorSpace: 'Oklch',
                },
              },
            })
          }}
        >
          oklch
        </span>
      </div>
      <LinearGradientStops stops={stops || []} selectedLayer={selectedLayer} />
    </div>
  )
}

export default LinearGradientType
