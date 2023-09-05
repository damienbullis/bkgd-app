import { GradientLayerType } from 'src/components/Layers/LayerTypeSchema'
// import styles from './GradientType.module.css'
import { debounce, hslToHex, randomHex, rgbToHex } from '@utils'
import { EventHandler } from '@state/events'
import { ToggleButton } from '@shared'
import RadialPosition from './RadialGradient/RadialPosition'
import { ArrowsCounterClockwise, PlusCircle } from '@phosphor-icons/react'
import RadialSize from './RadialGradient/RadialSize'

const deHandler = debounce(EventHandler, 200)

type RadialGradientPropsType = GradientLayerType['props'] & { type: 'radial' }
type GradientStopsType = Exclude<RadialGradientPropsType['stops'], undefined>[0]

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

const RadialGradientStops = ({
  stops = [],
  selectedLayer,
}: {
  stops: RadialGradientPropsType['stops']
  selectedLayer: string
}) => {
  return (
    <>
      {stops.map(([color, opacity, stop], i) => (
        <ColorStop
          key={i}
          index={i}
          color={color}
          opacity={opacity}
          stop={stop}
          allStops={stops}
          selectedLayer={selectedLayer}
        />
      ))}

      <button
        onClick={() =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type: 'radial',
                stops: [...stops, [randomHex(), null, null]],
              },
            },
          })
        }
      >
        Add Stop
      </button>
    </>
  )
}

const ColorStop = ({
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
  return (
    <>
      <label>
        Color
        <input
          type="color"
          defaultValue={transformColorValue(color)}
          onChange={(e) =>
            EventHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'radial',
                  stops: allStops.map((s, i) => {
                    const [, opacity, stop] = s
                    if (i === index) {
                      return [e.target.value, opacity || null, stop || null]
                    }
                    return s
                  }),
                },
              },
            })
          }
        />
      </label>
      <label>
        Opacity
        <input
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
                  type: 'radial',
                  stops: allStops.map((s, i) => {
                    const [color, , stop] = s
                    if (i === index) {
                      return [color, Number(e.target.value) / 100, stop || null]
                    }
                    return s
                  }),
                },
              },
            })
          }
        />
      </label>
      <label>
        Stops
        <span>
          single
          <input
            type="radio"
            name="stop"
            value="single"
            defaultChecked={typeof stop === 'number'}
            onChange={() =>
              EventHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    stops: allStops.map((s, i) => {
                      const [color, opacity] = s
                      if (i === index) {
                        return [color, opacity || null, 0]
                      }
                      return s
                    }),
                  },
                },
              })
            }
          />
        </span>
        <span>
          double
          <input
            type="radio"
            name="stop"
            value="double"
            defaultChecked={Array.isArray(stop)}
            onChange={() =>
              EventHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    stops: allStops.map((s, i) => {
                      const [color, opacity] = s
                      if (i === index) {
                        return [color, opacity || null, [0, 100]]
                      }
                      return s
                    }),
                  },
                },
              })
            }
          />
        </span>
        <br />
        <StopInput
          stop={stop}
          selectedLayer={selectedLayer}
          index={index}
          allStops={allStops}
        />
      </label>
    </>
  )
}

const DEFAULT_STOP_PROPS = {
  type: 'number',
  min: -100,
  max: 200,
  step: 5,
}

const StopInput = ({
  index,
  property = 'stops',
  stop,
  allStops,
  selectedLayer,
}: {
  index?: number
  property?: 'size' | 'stops'
  stop: GradientStopsType[2]
  allStops: GradientStopsType[]
  selectedLayer: string
}) => {
  if (Array.isArray(stop)) {
    return (
      <>
        <input
          {...DEFAULT_STOP_PROPS}
          defaultValue={stop[0]}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'radial',
                  [property]: allStops.map((s, i) => {
                    const [color, opacity] = s
                    if (i === index) {
                      return [
                        color,
                        opacity || null,
                        [Number(e.target.value), stop[1]],
                      ]
                    }
                    return s
                  }),
                },
              },
            })
          }
        />
        <input
          {...DEFAULT_STOP_PROPS}
          defaultValue={stop[1]}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'radial',
                  [property]: allStops.map((s, i) => {
                    const [color, opacity] = s
                    if (i === index) {
                      return [
                        color,
                        opacity || null,
                        [stop[0], Number(e.target.value)],
                      ]
                    }
                    return s
                  }),
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
      {...DEFAULT_STOP_PROPS}
      defaultValue={stop ?? 100}
      onChange={(e) =>
        deHandler({
          action: 'bkgd-update-layer',
          payload: {
            id: selectedLayer,
            type: 'gradient',
            props: {
              type: 'radial',
              [property]: allStops.map((s, i) => {
                const [color, opacity] = s
                if (i === index) {
                  return [color, opacity || null, Number(e.target.value)]
                }
                return s
              }),
            },
          },
        })
      }
    />
  )
}

const RadialGradientType = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: RadialGradientPropsType
  selectedLayer: string
}) => {
  const { position, shape, size, colorSpace, repeating, stops } = typeProps
  return (
    <>
      {/* Shape Toggle */}
      <div className="mb-2 flex w-full flex-row items-center justify-stretch gap-4">
        <div className="inline-flex items-center gap-2">
          <label className="text-[10px] text-gray-300">Shape</label>
          <ToggleButton
            onLabel="circle"
            offLabel="ellipse"
            defaultValue={shape || 'circle'}
            onChange={(v) =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    shape: v ? 'circle' : 'ellipse',
                  },
                },
              })
            }
          />
        </div>
        <div className="ml-auto inline-flex items-center gap-2">
          <label className="text-[10px] text-gray-300">Color Space</label>
          <ToggleButton
            onLabel="oklab"
            offLabel="Oklch"
            defaultValue={colorSpace || 'oklab'}
            onChange={(v) =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    colorSpace: v ? 'Oklch' : 'oklab',
                  },
                },
              })
            }
          />
        </div>
      </div>

      <div className="mt-3 flex w-full flex-row items-center gap-4">
        <RadialPosition position={position} selectedLayer={selectedLayer} />
        {/* Size */}
        <RadialSize
          size={Array.isArray(size) ? size : [100, 100]}
          selectedLayer={selectedLayer}
        />
        {/* Repeating Button */}
        <div
          className="ml-auto flex cursor-pointer flex-row items-center justify-end"
          onClick={() => {
            const el =
              document.querySelector<HTMLInputElement>('#repeating-icon')
            if (el) el.classList.toggle('text-fuchsia-500')
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'radial',
                  repeating: !repeating,
                },
              },
            })
          }}
        >
          <label className="text-[10px] text-gray-300">Repeating</label>
          <ArrowsCounterClockwise
            id="repeating-icon"
            className="ml-2 text-2xl hover:scale-105 focus:scale-95 active:scale-95"
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        <h4 className="-skew-x-6 bg-gradient-to-r from-amber-500 to-sky-500 to-[150%] bg-clip-text text-transparent">
          RADIAL GRADIENT
        </h4>
        <label className="ml-auto text-sm text-gray-300">
          {(stops || []).length} Stops
        </label>
        <button
          className="grid place-content-center rounded-full p-1 text-base text-gray-300 transition
        hover:text-white active:scale-95 active:text-white"
          onClick={() =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'radial',
                  stops: [...(stops || []), [randomHex(), null, null]],
                },
              },
            })
          }
        >
          <PlusCircle size="2em" />
        </button>
      </div>
      <label>
        Stops
        <RadialGradientStops stops={stops} selectedLayer={selectedLayer} />
      </label>
    </>
  )
}

export default RadialGradientType
