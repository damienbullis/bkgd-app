import {
  At,
  CircleHalf,
  Command,
  DotsSixVertical,
  Eyedropper,
  Flask,
  Gear,
  Gradient,
  Palette,
  Rainbow,
  Stack,
  Toolbox,
} from '@phosphor-icons/react'

const LAYER_TYPES = {
  stack: Stack,
  eyedropper: Eyedropper,
  flask: Flask,
  at: At,
  circleHalf: CircleHalf,
  command: Command,
  dotsSixVertical: DotsSixVertical,
  palette: Palette,
  rainbow: Rainbow,
  gradient: Gradient,
  toolbox: Toolbox,
  gear: Gear,
} as const

type LayerType = keyof typeof LAYER_TYPES

const randomLayer = () => {
  const layers = Object.keys(LAYER_TYPES) as LayerType[]
  const random = Math.floor(Math.random() * layers.length)
  return layers[random]
}

export type {LayerType}

export { LAYER_TYPES, randomLayer }