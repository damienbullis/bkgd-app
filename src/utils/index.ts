export { default as throttle } from './throttle'
export { default as debounce } from './debounce'
export { hexToHSL, hexToRGB } from './colorHelpers'
export { default as calcAverageColor } from './calcAverageColor'

export function makeID() {
  return Math.random().toString(36).substring(2, 7)
}
