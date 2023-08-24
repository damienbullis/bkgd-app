import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { debounce } from '@utils'

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
        <label>
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
        </label>
        <label>
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
        </label>
      </label>
    </>
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
