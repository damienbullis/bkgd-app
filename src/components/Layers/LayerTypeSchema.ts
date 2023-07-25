import { z } from 'zod'

const ColorPropsSchema = z.union([
  z.string(),
  z.object({ h: z.number(), s: z.number(), l: z.number() }),
  z.object({ r: z.number(), g: z.number(), b: z.number() }),
])

const SolidPropsSchema = z.object({
  type: z.literal('solid'),
  props: z.object({
    color: ColorPropsSchema,
  }),
})

const GradientPropsSchema = z.object({
  type: z.literal('gradient'),
  props: z.object({
    gradient: z.array(z.tuple([ColorPropsSchema, z.number()])),
    type: z.enum(['linear', 'radial', 'conic']),
  }),
})

const NoisePropsSchema = z.object({
  type: z.literal('noise'),
  props: z.object({
    noise: z.number(),
    type: z.enum(['turbulence', 'perlin']),
  }),
})

const LayerPropsSchema = z.union([
  SolidPropsSchema,
  GradientPropsSchema,
  NoisePropsSchema,
])

const SharedLayerPropsSchema = z.object({
  id: z.string(),
  opacity: z.number().optional(),
  backgroundBlend: z.boolean().optional(),
  backgroundSize: z.string().optional(),
  backgroundPosition: z.string().optional(),
  blendMode: z
    .enum([
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
    ])
    .optional(),
})

const LayerTypeSchema = z.intersection(LayerPropsSchema, SharedLayerPropsSchema)

const LayerSchema = z.object({
  layerStack: z
    .array(z.string())
    .catch((err) => {
      console.warn(err.error.issues)
      return []
    })
    .default([]),
  layerData: z
    .array(LayerTypeSchema)
    .catch((err) => {
      console.warn(err.error.issues)
      return []
    })
    .default([]),
})

export { LayerSchema }
