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
  stops: LinearGradientPropsType['stops']
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
          onChange={(e) => console.log('Color', e.target.value, index)}
        />
      </label>
      <label>
        Opacity
        <input
          type="number"
          defaultValue={opacity ?? 100}
          min={0}
          max={100}
          onChange={(e) => console.log('Opacity', e.target.value, index)}
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
            onChange={(e) => console.log('single stop', e.target.value, index)}
          />
        </span>
        <span>
          double
          <input
            type="radio"
            name="stop"
            value="double"
            defaultChecked={Array.isArray(stop)}
            onChange={(e) => console.log('doiuble stop', e.target.value, index)}
          />
        </span>
        <br />
        <StopInput stop={stop} selectedLayer={selectedLayer} index={index} />
      </label>
    </>
  )
}

const StopInput = ({
  index,
  stop,
  selectedLayer,
}: {
  index: number
  stop: GradientStopsType[2]
  selectedLayer: string
}) => {
  if (Array.isArray(stop)) {
    return (
      <>
        <input
          type="number"
          defaultValue={stop[0]}
          min={0}
          max={100}
          onChange={(e) => console.log(e.target.value, selectedLayer, index)}
        />
        <input
          type="number"
          defaultValue={stop[1]}
          min={0}
          max={100}
          onChange={(e) => console.log(e.target.value, selectedLayer, index)}
        />
      </>
    )
  }
  return (
    <input
      type="number"
      defaultValue={stop ?? 100}
      min={0}
      max={100}
      onChange={(e) => console.log(e.target.value, selectedLayer, index)}
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
            onChange={(e) =>
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
            onChange={(e) =>
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
        <LinearGradientStops stops={stops} selectedLayer={selectedLayer} />
      </label>
    </>
  )
}

export default LinearGradientType
