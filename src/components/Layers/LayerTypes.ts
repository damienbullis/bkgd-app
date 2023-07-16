import { z } from 'zod'
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

const ColorPropsSchema = z.union([
  z.string(),
  z.object({ h: z.number(), s: z.number(), l: z.number() }),
  z.object({ r: z.number(), g: z.number(), b: z.number() }),
])

const SolidPropsSchema = z.object({
  color: ColorPropsSchema,
})

const GradientPropsSchema = z.object({
  gradient: z.array(z.tuple([ColorPropsSchema, z.number()])),
  type: z.enum(['linear', 'radial', 'conic']),
})

const NoisePropsSchema = z.object({
  noise: z.number(),
  type: z.enum(['turbulence', 'perlin']),
})

const LayerPropsSchema = z.union([
  SolidPropsSchema,
  GradientPropsSchema,
  NoisePropsSchema,
])

const SharedLayerPropsSchema = z.object({
  opacity: z.number(),
  backgroundBlend: z.boolean(),
  blendMode: z.enum([
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ]),
})

const LayerPropsTypeSchema = z.object({
  id: z.string(),
  type: z.enum(['solid', 'gradient', 'noise']),
  props: z.intersection(LayerPropsSchema, SharedLayerPropsSchema),
})

const BkgdSchema = z.object({
  layerStack: z.array(z.string()).catch((err) => {
    console.warn(err.error.issues)
    return []
  }),
  layerData: z.array(LayerPropsTypeSchema).catch((err) => {
    console.warn(err.error.issues)
    return []
  }),
})

// type BkgdType = z.infer<typeof BkgdSchema>

export type { LayerPropsType, LayerType, BlendModeType }
export { BkgdSchema }
