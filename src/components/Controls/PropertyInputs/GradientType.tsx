import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { debounce, hslToHex, randomHex, rgbToHex } from '@utils'

import { GradientLayerType } from '../../Layers/LayerTypeSchema'
import styles from './GradientType.module.css'

type GradientTypeProps = GradientLayerType['props']

const deHandler = debounce(EventHandler, 200)

// const randomGradient = (type: GradientLayerType['props']['type']) => {

// }

const LinearGradientType = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: GradientTypeProps & { type: 'linear' }
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
            value="oklab"
            defaultChecked={colorSpace === 'oklab'}
            onChange={(e) =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'linear',
                    colorSpace: e.target
                      .value as GradientTypeProps['colorSpace'],
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
            value="oklch"
            defaultChecked={colorSpace === 'Oklch'}
            onChange={(e) =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'linear',
                    colorSpace: e.target
                      .value as GradientTypeProps['colorSpace'],
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

const LinearGradientStops = ({
  stops = [],
  selectedLayer,
}: {
  stops: GradientTypeProps['stops']
  selectedLayer: string
}) => {
  if (stops.length === 0) {
    // Add a stop
  }

  return (
    // color, opacity, stop
    // opacity is a number
    // stop is a number | [number, number]
    <>
      {stops.map(([color, opacity, stop], i) => (
        <ColorStop
          key={i}
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
type GradientStopsType = Exclude<GradientTypeProps['stops'], undefined>[0]

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

const ColorStop = ({
  color,
  opacity,
  stop,
  selectedLayer,
}: {
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
          onChange={(e) => console.log('Color', e.target.value)}
        />
      </label>
      <label>
        Opacity
        <input
          type="number"
          defaultValue={opacity ?? 100}
          min={0}
          max={100}
          onChange={(e) => console.log('Opacity', e.target.value)}
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
            onChange={(e) => console.log('single stop', e.target.value)}
          />
        </span>
        <span>
          double
          <input
            type="radio"
            name="stop"
            value="double"
            defaultChecked={Array.isArray(stop)}
            onChange={(e) => console.log('doiuble stop', e.target.value)}
          />
        </span>
        <br />
        <StopInput stop={stop} selectedLayer={selectedLayer} />
      </label>
    </>
  )
}

const StopInput = ({
  stop,
  selectedLayer,
}: {
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
          onChange={(e) => console.log(e.target.value)}
        />
        <input
          type="number"
          defaultValue={stop[1]}
          min={0}
          max={100}
          onChange={(e) => console.log(e.target.value)}
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
      onChange={(e) => console.log(e.target.value)}
    />
  )
}

const RadialGradientType = ({
  typeProps,
}: {
  typeProps: GradientTypeProps
}) => {
  return <></>
}

const ConicGradientType = ({ typeProps }: { typeProps: GradientTypeProps }) => {
  return <></>
}

const GradientSwitch = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: GradientTypeProps
  selectedLayer: string
}) => {
  switch (typeProps.type) {
    case 'linear':
      return (
        <LinearGradientType
          typeProps={typeProps}
          selectedLayer={selectedLayer}
        />
      )
    case 'radial':
      return <RadialGradientType typeProps={typeProps} />
    case 'conic':
      return <ConicGradientType typeProps={typeProps} />
    default: {
      const exhaustiveCheck: never = typeProps
      return exhaustiveCheck
    }
  }
}

const GradientType = ({ typeProps }: { typeProps: GradientTypeProps }) => {
  // Gradients need to have multiple opacity's, colors, and stops
  const [selectedLayer] = useSelectedLayer()

  return (
    <div className={styles.wrap}>
      <label htmlFor="gradient-type">Gradient Type</label>
      <select
        id="gradient-type"
        defaultValue={typeProps.type}
        onChange={(e) =>
          EventHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type: e.target.value as GradientTypeProps['type'],
              },
            },
          })
        }
      >
        <option value="linear">Linear</option>
        <option value="radial">Radial</option>
        <option value="conic">Conic</option>
      </select>
      <GradientSwitch typeProps={typeProps} selectedLayer={selectedLayer} />
    </div>
  )
}

export default GradientType
