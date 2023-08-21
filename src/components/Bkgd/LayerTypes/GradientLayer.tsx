import {
  GradientLayerType,
  SharedLayerPropsSchemaType,
} from '../../Layers/LayerTypeSchema'

type GradientLayerProps = GradientLayerType & SharedLayerPropsSchemaType

const GradientLayer = (layer: GradientLayerProps) => {
  console.log('GradientLayer', { layer })
  return ''
}

export default GradientLayer
