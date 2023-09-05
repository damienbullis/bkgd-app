import { GradientLayerType } from 'src/components/Layers/LayerTypeSchema'
// import styles from './GradientType.module.css'
import { debounce, hslToHex, randomHex, rgbToHex } from '@utils'
import { EventHandler } from '@state/events'
import { PlusCircle } from '@phosphor-icons/react'

const deHandler = debounce(EventHandler, 200)

type ConicGradientPropsType = GradientLayerType['props'] & { type: 'conic' }
type GradientStopsType = Exclude<ConicGradientPropsType['stops'], undefined>[0]

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
  stops: ConicGradientPropsType['stops']
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
                type: 'conic',
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
  // TODO: add in color space selector
  return (
    <>
      <label>
        Color
        <input
          type="color"
          defaultValue={transformColorValue(color)}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'conic',
                  stops: allStops.map((s, i) =>
                    i === index
                      ? [e.target.value, s[1], s[2]]
                      : [s[0], s[1], s[2]]
                  ),
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
                  type: 'conic',
                  stops: allStops.map((s, i) =>
                    i === index ? [s[0], Number(e.target.value), s[2]] : s
                  ),
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
                    type: 'conic',
                    stops: allStops.map((s, i) =>
                      i === index
                        ? [
                            s[0],
                            s[1],
                            Number(stop ?? (100 / allStops.length) * i),
                          ]
                        : s
                    ),
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
                    type: 'conic',
                    stops: allStops.map((s, i) =>
                      i === index
                        ? [s[0], s[1], [0, (100 / allStops.length) * i]]
                        : s
                    ),
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
                  type: 'conic',
                  [property]: allStops.map((s, i) =>
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
          {...DEFAULT_STOP_PROPS}
          defaultValue={stop[1]}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'conic',
                  [property]: allStops.map((s, i) =>
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
      {...DEFAULT_STOP_PROPS}
      defaultValue={stop ?? 100}
      onChange={(e) =>
        deHandler({
          action: 'bkgd-update-layer',
          payload: {
            id: selectedLayer,
            type: 'gradient',
            props: {
              type: 'conic',
              [property]: allStops.map((s, i) =>
                i === index ? [s[0], s[1], Number(e.target.value)] : s
              ),
            },
          },
        })
      }
    />
  )
}

const ConicGradient = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: ConicGradientPropsType
  selectedLayer: string
}) => {
  const { position, colorSpace, repeating, stops, deg } = typeProps
  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-row items-center justify-start gap-2">
        <h4
          className="-skew-x-6 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'conic-gradient(from 0deg at right in oklch, aqua 0%, #ec4899 110%)',
          }}
        >
          CONIC GRADIENT
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
                  type: 'conic',
                  stops: [...(stops || []), [randomHex(), null, null]],
                },
              },
            })
          }
        >
          <PlusCircle size="2em" />
        </button>
      </div>
      <label htmlFor="deg">Deg</label>
      <input
        name="deg"
        type="number"
        defaultValue={deg || 0}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type: 'conic',
                deg: Number(e.target.value),
              },
            },
          })
        }
      />

      <label htmlFor="positionX">X</label>
      <input
        name="positionX"
        type="number"
        defaultValue={position?.[0] || 0}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type: 'conic',
                position: [Number(e.target.value), position?.[1] || 0],
              },
            },
          })
        }
      />
      <label htmlFor="positionY">
        Y
        <input
          name="positionY"
          type="number"
          defaultValue={position?.[1] || 0}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'conic',
                  position: [position?.[0] || 0, Number(e.target.value)],
                },
              },
            })
          }
        />
      </label>

      <label>
        Color Space
        <br />
        <span>
          oklab
          <input
            type="radio"
            name="color-space-oklab"
            defaultChecked={colorSpace === 'oklab'}
            onChange={() =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'conic',
                    colorSpace: 'oklab',
                  },
                },
              })
            }
          />
        </span>
        <span>
          oklch
          <input
            type="radio"
            name="color-space-oklch"
            defaultChecked={colorSpace === 'Oklch'}
            onChange={() =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'conic',
                    colorSpace: 'Oklch',
                  },
                },
              })
            }
          />
        </span>
      </label>
      <label>
        Repeating
        <input
          type="checkbox"
          defaultChecked={repeating}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'conic',
                  repeating: e.target.checked,
                },
              },
            })
          }
        />
      </label>
      <label>
        Stops
        <RadialGradientStops stops={stops} selectedLayer={selectedLayer} />
      </label>
    </>
  )
}

export default ConicGradient
