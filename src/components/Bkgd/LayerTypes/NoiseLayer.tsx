import { NoiseLayerType, SharedLayerPropsSchemaType } from '@types'

const NoiseLayer = (layer: NoiseLayerType & SharedLayerPropsSchemaType) => {
  const { type, frequency, octaves, stitch } = layer.props
  const string = `<svg xmlns="http://www.w3.org/2000/svg" width="500px" height="500px" opacity="${
    typeof layer.opacity === 'number' ? layer.opacity / 100 : 1
  }">
  <filter id="noise">
    <feTurbulence
      type="${type}"
      baseFrequency="${frequency || '0.65'}"
      numOctaves="${octaves || 3}"
      stitchTiles="${stitch || 'stitch'}"
    />
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)" />
</svg>`

  const dataUrl = `url(data:image/svg+xml;base64,${btoa(string)})`

  return dataUrl
}
export default NoiseLayer
