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

// TODO: add support for other color spaces?
type ColorType =
  | string
  | {
      h: number
      s: number
      l: number
    }
  | {
      r: number
      g: number
      b: number
    }
type SolidProps = {
  color: ColorType
}

type GradientProps = {
  gradient: [ColorType, number][]
  type: 'linear' | 'radial' | 'conic'
}

type NoiseProps = {
  noise: number
  type: 'turbulence' | 'perlin'
}

type LayerProps<T extends LayerEnum> = T extends 'solid'
  ? SolidProps
  : T extends 'gradient'
  ? GradientProps
  : T extends 'noise'
  ? NoiseProps
  : never

type SharedLayerProps = {
  id: string
  opacity: number
  blendMode: BlendModeEnum
  backgroundBlend: boolean
  backgroundSize: string
  backgroundPosition: string
  backgroundRepeat: number
}

type LayerPropsType<T extends LayerEnum> = SharedLayerProps & {
  type: T
  props: LayerProps<T>
}

export type { LayerPropsType, LayerEnum, BlendModeEnum }
