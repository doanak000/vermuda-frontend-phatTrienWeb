let timeout

export const debounce = (fn, delay = 800) => {
  clearTimeout(timeout)
  timeout = setTimeout(fn, delay)
}
