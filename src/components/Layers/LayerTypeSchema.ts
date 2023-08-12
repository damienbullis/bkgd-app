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

const GradientPropsSchema = z.object({
  id: z.string(),
  type: z.literal('gradient'),
  props: z.object({
    gradient: z.array(z.tuple([ColorPropsSchema, z.number()])),
    type: z.enum(['linear', 'radial', 'conic']),
  }),
})

const NoisePropsSchema = z.object({
  id: z.string(),
  type: z.literal('noise'),
  props: z.object({
    noise: z.number(),
    type: z.enum(['turbulence', 'perlin']),
  }),
})

const SharedLayerPropsSchema = z.object({
  opacity: z.number().optional(),
  backgroundBlend: z.boolean().optional(),
  backgroundSize: z.string().optional(),
  backgroundPosition: z.string().optional(),
  backgroundRepeat: z.number().optional(), // This wont map directly to css
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
      // TODO: fix this
      // this is just a poc of how to handle errors
      // maybe I just want to use defaults?
      // using zod.default() on the individual property level???
      console.log('LayerData Error', { input })
      let layer: any
      for (const { path } of error.issues) {
        const [, layerIndex, ...props] = path
        layer = input[layerIndex as number]

        if (layer) {
          let drill: any = layer
          for (const prop of props as string[]) {
            console.log('LayerData Error', { prop, drill })

            if (prop === 'props') {
              drill = drill[prop] as any
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
