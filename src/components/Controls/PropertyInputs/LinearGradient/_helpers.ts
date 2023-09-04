import { GradientLayerType } from 'src/components/Layers/LayerTypeSchema'
import { hslToHex, rgbToHex } from '@utils'

type LinearGradientPropsType = GradientLayerType['props'] & { type: 'linear' }
type GradientStopsType = Exclude<LinearGradientPropsType['stops'], undefined>[0]

const getID = (index: number) => `gradient-stop-${index}-` as const

const transformColorValue = (color: GradientStopsType[0]) => {
  if (typeof color === 'string') {
    return color
  } else {
    if ('r' in color) {
      return rgbToHex(color)
    } else {
      return hslToHex(color)
    }
  }
}

const DEFAULT_STOP_PROPS = {
  type: 'range',
  min: -100,
  max: 200,
  step: 5,
}

export { getID, transformColorValue, DEFAULT_STOP_PROPS }

export type { LinearGradientPropsType, GradientStopsType }
