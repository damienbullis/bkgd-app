// import { randomHex } from '../../../utils/colorHelpers'
import { EventHandler } from '@state/events'
import { GradientLayerType } from '../../Layers/LayerTypeSchema'
import { useSelectedLayer } from '@state/global'

type GradientTypeProps = GradientLayerType['props']

// const randomGradient = (type: GradientLayerType['props']['type']) => {

// }

const LinearGradientType = ({
  typeProps,
}: {
  typeProps: GradientTypeProps
}) => {
  return <></>
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

const GradientSwitch = ({ typeProps }: { typeProps: GradientTypeProps }) => {
  switch (typeProps.type) {
    case 'linear':
      return <LinearGradientType typeProps={typeProps} />
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
    <div>
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
      <GradientSwitch typeProps={typeProps} />
    </div>
  )
}

export default GradientType
