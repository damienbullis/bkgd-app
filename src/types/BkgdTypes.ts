import z from 'zod'
import { LayerSchema } from '../components/Layers/LayerTypeSchema'

export const bkgdSchema = z.object({
  id: z.string(),
  name: z.string().default('Untitled'),
  layers: LayerSchema,
  createdAt: z.string().default(() => new Date().toJSON()),
  updatedAt: z.string().default(() => new Date().toJSON()),
})

export const bkgdsSchema = z
  .array(bkgdSchema)
  .catch((e) => {
    console.error(e)
    return []
  })
  .default([])

export type Bkgds = z.infer<typeof bkgdsSchema>
export type Bkgd = z.infer<typeof bkgdSchema>
