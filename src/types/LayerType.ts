import {
  NoiseLayerType,
  GradientLayerType,
  SolidLayerType,
  SharedLayerPropsSchemaType,
} from '../components/Layers/LayerTypeSchema'

type LayerEnum = 'solid' | 'gradient' | 'noise'
type BlendModeEnum = Exclude<SharedLayerPropsSchemaType['blendMode'], undefined>

type SolidProps = SolidLayerType['props']
type GradientProps = GradientLayerType['props']
type NoiseProps = NoiseLayerType['props']

type SharedLayerProps = SharedLayerPropsSchemaType

type LayerPropsType<T extends LayerEnum> = SharedLayerProps & {
  type: T
  props: T extends 'solid'
    ? SolidProps
    : T extends 'gradient'
    ? GradientProps
    : T extends 'noise'
    ? NoiseProps
    : never
}

export type { LayerPropsType, LayerEnum, BlendModeEnum }
