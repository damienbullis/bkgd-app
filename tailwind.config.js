import headlessui from '@headlessui/tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.[jt]s?(x)'],
  plugins: [headlessui],
}
