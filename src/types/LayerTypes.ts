import { z } from 'zod'

const ColorPropsSchema = z.union([
  z.string(),
  z.object({ h: z.number(), s: z.number(), l: z.number() }),
  z.object({ r: z.number(), g: z.number(), b: z.number() }),
])

const SolidPropsSchema = z.object({
  id: z.string(),
  type: z.literal('solid'),
  props: z.object({
    color: ColorPropsSchema,
  }),
})

const OpacityPropsSchema = z.number().nullable()

const ColorStopsPropsSchema = z.union([
  z.number(),
  z.tuple([z.number(), z.number()]),
  z.null(),
])

const LineaerGradientPropsSchema = z.object({
  type: z.literal('linear'),
  deg: z.number().optional(),
  colorSpace: z.enum(['oklab', 'Oklch']).optional(),
  repeating: z.boolean().optional(),
  stops: z
    .array(
      z.tuple([ColorPropsSchema, OpacityPropsSchema, ColorStopsPropsSchema])
    )
    .optional(),
})

const RadialGradientPropsSchema = z.object({
  type: z.literal('radial'),
  colorSpace: z.enum(['oklab', 'Oklch']).optional(),
  size: z.tuple([z.number(), z.number()]).optional(),
  position: z.tuple([z.number(), z.number()]).optional(),
  repeating: z.boolean().optional(),
  stops: z
    .array(
      z.tuple([ColorPropsSchema, OpacityPropsSchema, ColorStopsPropsSchema])
    )
    .optional(),
})

const ConicGradientPropsSchema = z.object({
  type: z.literal('conic'),
  deg: z.number().optional(),
  colorSpace: z.enum(['oklab', 'Oklch']).optional(),
  position: z.tuple([z.number(), z.number()]).optional(),
  repeating: z.boolean().optional(),
  stops: z
    .array(
      z.tuple([ColorPropsSchema, OpacityPropsSchema, ColorStopsPropsSchema])
    )
    .optional(),
})

const GradientPropsSchema = z.object({
  id: z.string(),
  type: z.literal('gradient'),
  props: z.discriminatedUnion('type', [
    LineaerGradientPropsSchema,
    RadialGradientPropsSchema,
    ConicGradientPropsSchema,
  ]),
})

const NoisePropsSchema = z.object({
  id: z.string(),
  type: z.literal('noise'),
  props: z.object({
    type: z.enum(['turbulence', 'fractalNoise']),
    frequency: z.string().optional(),
    octaves: z.string().optional(),
    stitch: z.enum(['noStitch', 'stitch']).optional(),
  }),
})

const SharedLayerPropsSchema = z.object({
  opacity: z.number().optional(),
  backgroundSize: z.string().optional(),
  backgroundPosition: z.string().optional(),
  backgroundRepeat: z
    .enum(['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'space', 'round'])
    .optional(), // This wont map directly to css
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

const LayerTypeSchema = z.intersection(
  z.discriminatedUnion('type', [
    SolidPropsSchema,
    GradientPropsSchema,
    NoisePropsSchema,
  ]),
  SharedLayerPropsSchema
)

type LayerType = z.infer<typeof LayerTypeSchema>
type SolidLayerType = z.infer<typeof SolidPropsSchema>
type GradientLayerType = z.infer<typeof GradientPropsSchema>
type NoiseLayerType = z.infer<typeof NoisePropsSchema>
type SharedLayerPropsSchemaType = z.infer<typeof SharedLayerPropsSchema>

const LayerSchema = z.object({
  id: z.string().optional(),
  layerStack: z.array(z.string()).default([]),
  layerData: z.array(LayerTypeSchema).default([]),
})

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

export { LayerSchema }
export type {
  BlendModeEnum,
  LayerEnum,
  LayerPropsType,
  LayerType,
  SolidLayerType,
  GradientLayerType,
  NoiseLayerType,
  SharedLayerPropsSchemaType,
}
