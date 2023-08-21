import {
  NoiseLayerType,
  GradientLayerType,
  SolidLayerType,
  SharedLayerPropsSchemaType,
} from '../components/Layers/LayerTypeSchema'

type LayerEnum = 'solid' | 'gradient' | 'noise'
type BlendModeEnum =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'

type SolidProps = SolidLayerType['props']

type GradientProps = GradientLayerType['props']

type NoiseProps = NoiseLayerType['props']

type LayerProps<T extends LayerEnum> = T extends 'solid'
  ? SolidProps
  : T extends 'gradient'
  ? GradientProps
  : T extends 'noise'
  ? NoiseProps
  : never

type SharedLayerProps = SharedLayerPropsSchemaType

type LayerPropsType<T extends LayerEnum> = SharedLayerProps & {
  type: T
  props: LayerProps<T>
}

export type { LayerPropsType, LayerEnum, BlendModeEnum }
