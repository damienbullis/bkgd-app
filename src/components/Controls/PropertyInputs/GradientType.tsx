import { useSelectedLayer } from '@state/global'

import { GradientLayerType } from '../../Layers/LayerTypeSchema'
import ConicGradient from './ConicGradient'
import LinearGradient from './LinearGradient'
import RadialGradient from './RadialGradient'

type GradientTypeProps = GradientLayerType['props']

const GradientType = ({ typeProps }: { typeProps: GradientTypeProps }) => {
  const [selectedLayer] = useSelectedLayer()

  switch (typeProps.type) {
    case 'linear':
      return (
        <LinearGradient typeProps={typeProps} selectedLayer={selectedLayer} />
      )
    case 'radial':
      return (
        <RadialGradient typeProps={typeProps} selectedLayer={selectedLayer} />
      )
    case 'conic':
      return (
        <ConicGradient typeProps={typeProps} selectedLayer={selectedLayer} />
      )
    default: {
      const exhaustiveCheck: never = typeProps
      return exhaustiveCheck
    }
  }
}

export default GradientType
