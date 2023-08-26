import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'

import { GradientLayerType } from '../../Layers/LayerTypeSchema'
import styles from './GradientType.module.css'
import LinearGradientType from './LinearGradientType'
import RadialGradientType from './RadialGradientType'
import ConicGradientType from './ConicGradientType'

type GradientTypeProps = GradientLayerType['props']

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
      return (
        <RadialGradientType
          typeProps={typeProps}
          selectedLayer={selectedLayer}
        />
      )
    case 'conic':
      return (
        <ConicGradientType
          typeProps={typeProps}
          selectedLayer={selectedLayer}
        />
      )
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
