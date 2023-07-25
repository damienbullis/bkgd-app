function limitDecimalToTwo(num: number) {
  return Math.floor(num * 100) / 100
}

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove '#' if present
  hex = hex.replace(/^#/, '')

  // Convert the hex values to integers
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // Normalize the RGB values to the range [0, 1]
  const rNormalized = r / 255
  const gNormalized = g / 255
  const bNormalized = b / 255

  // Find the minimum and maximum values among RGB components
  const max = Math.max(rNormalized, gNormalized, bNormalized)
  const min = Math.min(rNormalized, gNormalized, bNormalized)

  // Calculate lightness (l)
  let l = (max + min) / 2

  // Calculate saturation (s)
  let s = 0
  if (max !== min) {
    const delta = max - min
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
  }

  // Calculate hue (h) in degrees
  let h = 0
  if (max !== min) {
    switch (max) {
      case rNormalized:
        h =
          (gNormalized - bNormalized) / (max - min) +
          (gNormalized < bNormalized ? 6 : 0)
        break
      case gNormalized:
        h = (bNormalized - rNormalized) / (max - min) + 2
        break
      case bNormalized:
        h = (rNormalized - gNormalized) / (max - min) + 4
        break
    }
    h /= 6
  }

  // Convert hue to degrees and round to two decimal places
  h = Math.round(h * 360 * 100) / 100

  // Convert saturation and lightness to percentages and round to two decimal places
  s = Math.round(s * 100 * 100) / 100
  l = Math.round(l * 100 * 100) / 100

  return {
    h: limitDecimalToTwo(h),
    s: limitDecimalToTwo(s),
    l: limitDecimalToTwo(l),
  }
}

function hexToRGB(
  hex: string,
  useLinear = true
): { r: number; g: number; b: number } {
  // Remove '#' if present
  hex = hex.replace(/^#/, '')

  // Convert the hex values to integers
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  const factor = useLinear ? 255 : 1
  // Return the RGB values as an object
  return {
    r: limitDecimalToTwo(r / factor),
    g: limitDecimalToTwo(g / factor),
    b: limitDecimalToTwo(b / factor),
  }
}

export { hexToHSL, hexToRGB }
