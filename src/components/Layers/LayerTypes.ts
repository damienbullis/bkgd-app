type LayerType = 'solid' | 'gradient' | 'noise'
type BlendModeType =
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

type LayerProps<T extends LayerType> = T extends 'solid'
  ? SolidProps
  : T extends 'gradient'
  ? GradientProps
  : T extends 'noise'
  ? NoiseProps
  : never

type SharedLayerProps = {
  opacity: number
  backgroundBlend: boolean
  blendMode: BlendModeType
}

type LayerPropsType<T extends LayerType> = {
  id: string
} & {
  type: T
  props: LayerProps<T> & SharedLayerProps
}

export type { LayerPropsType, LayerType, BlendModeType }
