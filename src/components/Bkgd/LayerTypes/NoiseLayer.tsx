const NoiseLayer = ({
  type = 'fractalNoise',
  frequency = '0.65',
  octaves = '3',
  stitch = 'stitch',
  opacity = '1',
  width = 500,
  height = 500,
}) => {
  const string = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <filter id="noise">
        <feTurbulence
          type="${type}"
          baseFrequency="${frequency}"
          numOctaves="${octaves}"
          stitchTiles="${stitch}"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="${opacity}" />
    </svg>
  `
  const dataUrl = `data:image/svg+xml;base64,${btoa(string)}`

  return dataUrl
}
export default NoiseLayer
