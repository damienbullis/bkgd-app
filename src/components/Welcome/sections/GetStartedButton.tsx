import { IceCream } from '@phosphor-icons/react'

export default function GetStartedButton() {
  return (
    <a
      href={'/' + window.location.search}
      className="group mb-12 mt-6 inline-grid w-auto grid-flow-col grid-cols-[auto_0fr] items-stretch overflow-hidden rounded-lg bg-pink-500 bg-opacity-30 text-xl uppercase transition-all hover:grid-cols-[auto_1fr]"
    >
      <p className="flex items-center p-8 text-center text-white">
        get started
      </p>
      <span className="grid w-full place-content-center overflow-hidden bg-pink-500 p-1 text-5xl transition-all group-hover:scale-100 group-hover:p-4">
        <IceCream
          weight="duotone"
          className="inline-grid w-full scale-0 group-hover:scale-100"
        />
      </span>
    </a>
  )
}
