type ThrottleFunction<T extends unknown[]> = (...args: T) => void

function throttle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): ThrottleFunction<T> {
  let lastCallTime = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function throttledFunction(
    this: ThisParameterType<typeof callback>,
    ...args: T
  ) {
    const now = Date.now()
    const timeSinceLastCall = now - lastCallTime

    // If the previous call was more than 'delay' milliseconds ago,
    // immediately execute the callback.
    if (timeSinceLastCall >= delay) {
      lastCallTime = now
      callback.apply(this, args)
    } else {
      // Otherwise, clear the previous timeout and set a new one.
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now()
        callback.apply(this, args)
      }, delay - timeSinceLastCall)
    }
  }
}

export default throttle
