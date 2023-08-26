import { GradientLayerType } from 'src/components/Layers/LayerTypeSchema'
import styles from './GradientType.module.css'
import { debounce, hslToHex, randomHex, rgbToHex } from '@utils'
import { EventHandler } from '@state/events'

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
                type: 'linear',
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
                  type: 'linear',
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
        Stop
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
                    type: 'linear',
                    stops: allStops.map((s, i) =>
                      i === index
                        ? [s[0], s[1], s[2] ?? (100 / allStops.length) * i]
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
                    type: 'linear',
                    stops: allStops.map((s, i) =>
                      i === index
                        ? [
                            s[0],
                            s[1],
                            Array.isArray(s[2])
                              ? s[2]
                              : [
                                  (100 / allStops.length) * i,
                                  (100 / allStops.length) * (i + 1),
                                ],
                          ]
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
      {...DEFAULT_STOP_PROPS}
      defaultValue={stop ?? (100 / allStops.length) * index}
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
  return (
    <>
      <label className={styles.full}>
        Degrees
        <input
          type="number"
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
      </label>
      <label>
        Color Space
        <br />
        <span>
          oklab
          <input
            type="radio"
            name="color-space"
            defaultChecked={colorSpace === 'oklab'}
            onChange={() =>
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
            }
          />
        </span>
        <span>
          oklch
          <input
            type="radio"
            name="color-space"
            defaultChecked={colorSpace === 'Oklch'}
            onChange={() =>
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
                  type: 'linear',
                  repeating: e.target.checked,
                },
              },
            })
          }
        />
      </label>
      <label>
        Stops
        <LinearGradientStops
          stops={stops || []}
          selectedLayer={selectedLayer}
        />
      </label>
    </>
  )
}

export default LinearGradientType
