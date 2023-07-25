function debounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null

  return function debouncedFunction(
    this: ThisParameterType<typeof callback>,
    ...args: T
  ) {
    const executeCallback = () => {
      callback.apply(this, args)
      timeoutId = null
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(executeCallback, delay)
  }
}

export default debounce
