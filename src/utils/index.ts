export { default as throttle } from './throttle'
export { default as debounce } from './debounce'
export {
  hexToHSL,
  hexToRGB,
  hslToHex,
  rgbToHex,
  randomHex,
} from './colorHelpers'
export { default as calcAverageColor } from './calcAverageColor'
export { default as checkBrowser } from './checkBrowser'

export function makeID() {
  return Math.random().toString(36).substring(2, 7)
}

export const Show = ({
  show,
  children,
}: {
  show: boolean
  children: JSX.Element
}) => (show ? children : null)

export const getPositionValue = (value = ''): [number, number] => {
  if (/\s/.test(value)) {
    const [x, y] = value.split(' ')
    return [Number(x.replace('%', '')), Number(y.replace('%', ''))]
  }
  return [0, 0]
}
