import { useSelectedLayer } from '@state/global'

import { GradientLayerType } from '../../Layers/LayerTypeSchema'
import RadialGradientType from './RadialGradientType'
import ConicGradientType from './ConicGradientType'
import LinearGradient from './LinearGradient'

type GradientTypeProps = GradientLayerType['props']

const GradientType = ({ typeProps }: { typeProps: GradientTypeProps }) => {
  // Gradients need to have multiple opacity's, colors, and stops
  const [selectedLayer] = useSelectedLayer()

  switch (typeProps.type) {
    case 'linear':
      return (
        <LinearGradient typeProps={typeProps} selectedLayer={selectedLayer} />
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

export default GradientType
