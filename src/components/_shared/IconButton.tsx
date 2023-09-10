import { Icon } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react'

type IconButtonProps = {
  icon: Icon
  active?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>
const IconButton = ({ icon: Icon, active, ...rest }: IconButtonProps) => {
  return (
    <button
      aria-selected={active ? 'true' : 'false'}
      {...rest}
      className="group cursor-pointer p-2 text-3xl opacity-95 disabled:cursor-not-allowed 
      disabled:opacity-50"
    >
      <Icon className="transition group-hover:scale-105 group-active:scale-95 group-disabled:group-hover:scale-100 group-disabled:group-active:scale-100" />
    </button>
  )
}

export default IconButton
