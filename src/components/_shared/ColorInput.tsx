import { InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>

export default function ColorInput(props: Props) {
  return (
    <input
      {...props}
      type="color"
      className="m-0 ml-auto h-8 w-8 cursor-pointer appearance-none overflow-hidden rounded-full 
      border-none bg-transparent p-0 outline-none ring-0 transition
      focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-black
      hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-black
      focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
      active:ring-1 active:ring-white active:ring-offset-2 active:ring-offset-black
      [&::-webkit-color-swatch-wrapper]:border-none
      [&::-webkit-color-swatch-wrapper]:p-0
      [&::-webkit-color-swatch-wrapper]:outline-none
      [&::-webkit-color-swatch]:border-none
      [&::-webkit-color-swatch]:outline-none"
    />
  )
}
