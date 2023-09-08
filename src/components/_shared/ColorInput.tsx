import { InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>

export default function ColorInput(props: Props) {
  return (
    <input
      {...props}
      type="color"
      className="m-0 ml-auto h-8 w-8 cursor-pointer appearance-none overflow-hidden rounded-full 
      border-none bg-transparent p-0 outline-none ring-0 transition
      focus-within:ring-2 focus-within:ring-white 
      hover:ring-2 hover:ring-white 
      focus:ring-2 focus:ring-white 
      active:ring-1 active:ring-white 
      [&::-webkit-color-swatch-wrapper]:border-none
      [&::-webkit-color-swatch-wrapper]:p-0
      [&::-webkit-color-swatch-wrapper]:outline-none
      [&::-webkit-color-swatch]:border-none
      [&::-webkit-color-swatch]:outline-none"
    />
  )
}
