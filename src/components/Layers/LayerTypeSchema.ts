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
  shape: z.enum(['ellipse', 'circle']).optional(),
  size: ColorStopsPropsSchema.optional(),
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
  layerStack: z
    .array(z.string())
    .catch((err) => {
      console.warn(err.error.issues)
      return []
    })
    .default([]),
  layerData: z
    .array(LayerTypeSchema)
    .catch(({ error, input }) => {
      // REFACTOR: This is a temp solution to sanitize the data
      console.log('LayerData Error', { input, error })
      let layer: Record<string, unknown> | undefined
      for (const { path } of error.issues) {
        const [, layerIndex, ...props] = path
        layer = input[layerIndex as number]

        if (layer) {
          let drill = layer
          for (const prop of props as string[]) {
            console.log('LayerData Error', { prop, drill })

            if (prop === 'props') {
              drill = drill[prop] as Record<string, unknown>
            }

            if (prop === 'color') {
              const next = layer as SolidLayerType
              next.props = {
                color: '#000000',
              }
            }
          }
        }
      }
      console.log('LayerData Error', { input })
      return input
    })
    .default([]),
})

export { LayerSchema }
export type {
  LayerType,
  SolidLayerType,
  GradientLayerType,
  NoiseLayerType,
  SharedLayerPropsSchemaType,
}
