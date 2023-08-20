import { randomHex } from '../../../utils/colorHelpers'
import { GradientLayerType } from '../../Layers/LayerTypeSchema'

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

const GradientType = ({ typeProps }: { typeProps: GradientTypeProps }) => {
  // Gradients need to have multiple opacity's, colors, and stops
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

export default GradientType
