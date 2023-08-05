import { LayerType } from '../Layers/LayerTypeSchema'
import { SolidLayer } from './LayerTypes'

const LayerTypeSwitch = ({ layer }: { layer: LayerType }) => {
  switch (layer.type) {
    case 'solid':
      return <SolidLayer layer={layer} />
    case 'gradient':
      return <div>Gradient</div>
    case 'noise':
      return <div>Noise</div>
    default: {
      const _exhaustiveCheck: never = layer
      return _exhaustiveCheck
    }
  }
}

export default LayerTypeSwitch
