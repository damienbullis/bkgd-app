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

function hslToHex(color: { h: number; s: number; l: number }): string {
  const h = color.h
  let s = color.s
  let l = color.l

  // Must be fractions of 1
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  // Having obtained RGB, convert channels to hex
  const rHex = Math.round((r + m) * 255).toString(16)
  const gHex = Math.round((g + m) * 255).toString(16)
  const bHex = Math.round((b + m) * 255).toString(16)

  // Prepend 0s, if necessary
  const rHexPadded = rHex.length === 1 ? '0' + rHex : rHex
  const gHexPadded = gHex.length === 1 ? '0' + gHex : gHex
  const bHexPadded = bHex.length === 1 ? '0' + bHex : bHex

  return '#' + rHexPadded + gHexPadded + bHexPadded
}

function hexToRGB(
  hex: string,
  useLinear = false
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

function rgbToHex(
  color: { r: number; g: number; b: number },
  useLinear = true
): string {
  const { r, g, b } = color
  const factor = useLinear ? 255 : 1
  // Convert the RGB values to hex
  const hex = [
    Math.round(r * factor),
    Math.round(g * factor),
    Math.round(b * factor),
  ]
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')

  return '#' + hex
}

function randomHex(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export { hexToHSL, hexToRGB, hslToHex, rgbToHex, randomHex }
