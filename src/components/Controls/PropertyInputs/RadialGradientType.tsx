import { GradientLayerType } from 'src/components/Layers/LayerTypeSchema'
// import styles from './GradientType.module.css'
import { debounce, hslToHex, randomHex, rgbToHex } from '@utils'
import { EventHandler } from '@state/events'

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
  selectedLayer,
}: {
  index: number
  color: GradientStopsType[0]
  opacity: GradientStopsType[1]
  stop: GradientStopsType[2]
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
            console.log('Color', e.target.value, selectedLayer, index)
          }
        />
      </label>
      <label>
        Opacity
        <input
          type="number"
          defaultValue={opacity ?? 100}
          min={0}
          max={100}
          onChange={(e) =>
            console.log('Opacity', e.target.value, selectedLayer, index)
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
            onChange={(e) =>
              console.log('single stop', e.target.value, selectedLayer, index)
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
            onChange={(e) =>
              console.log('doiuble stop', e.target.value, selectedLayer, index)
            }
          />
        </span>
        <br />
        <StopInput stop={stop} selectedLayer={selectedLayer} index={index} />
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
  selectedLayer,
}: {
  index?: number
  property?: 'size' | 'stops'
  stop: GradientStopsType[2]
  selectedLayer: string
}) => {
  if (Array.isArray(stop)) {
    return (
      <>
        <input
          {...DEFAULT_STOP_PROPS}
          defaultValue={stop[0]}
          onChange={(e) =>
            console.log(e.target.value, selectedLayer, property, index)
          }
        />
        <input
          {...DEFAULT_STOP_PROPS}
          defaultValue={stop[1]}
          onChange={(e) =>
            console.log(e.target.value, selectedLayer, property, index)
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
        console.log(e.target.value, selectedLayer, property, index)
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
  const { position = [], shape, size, colorSpace, repeating, stops } = typeProps
  return (
    <>
      <label htmlFor="positionX">X</label>
      <input
        name="positionX"
        type="number"
        defaultValue={position[0] || 0}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type: 'radial',
                position: [Number(e.target.value), position[1] || 0],
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
          defaultValue={position[1] || 0}
          onChange={(e) =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'radial',
                  position: [position[0] || 0, Number(e.target.value)],
                },
              },
            })
          }
        />
      </label>

      <label>
        Shape
        <br />
        <span>
          ellipse
          <input
            type="radio"
            name="shape"
            defaultChecked={shape === 'ellipse'}
            onChange={() =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    shape: 'ellipse',
                  },
                },
              })
            }
          />
        </span>
        <span>
          circle
          <input
            type="radio"
            name="shape"
            value="circle"
            defaultChecked={shape === 'circle'}
            onChange={() =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    shape: 'circle',
                  },
                },
              })
            }
          />
        </span>
      </label>
      <label>
        Size
        <StopInput
          property="size"
          stop={size || null}
          selectedLayer={selectedLayer}
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
                    type: 'radial',
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
                    type: 'radial',
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
                  type: 'radial',
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

export default RadialGradientType
