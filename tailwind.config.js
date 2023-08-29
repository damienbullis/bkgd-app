/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.[jt]s?(x)'],
  plugins: [
    import('@headlessui/tailwindcss').then((m) => m.default({ prefix: 'ui' })),
  ],
}
