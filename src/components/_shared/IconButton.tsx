import { Icon } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react'

type IconButtonProps = {
  icon: Icon
  active?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>
const IconButton = ({ icon: Icon, active, ...rest }: IconButtonProps) => {
  return (
    <button
      aria-selected={active}
      {...rest}
      className="group cursor-pointer p-2 text-3xl opacity-95 
      disabled:cursor-not-allowed disabled:opacity-50 
      aria-selected:opacity-100 aria-selected:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
    >
      <Icon className="transition group-hover:scale-105 group-active:scale-95" />
    </button>
  )
}

export default IconButton
