import { z } from 'zod'

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

const LayerSchema = z.object({
  layerStack: z
    .array(z.string())
    .catch((err) => {
      console.warn(err.error.issues)
      return []
    })
    .default([]),
  layerData: z
    .array(LayerPropsTypeSchema)
    .catch((err) => {
      console.warn(err.error.issues)
      return []
    })
    .default([]),
})

export { LayerSchema }
