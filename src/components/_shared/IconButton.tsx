import { Icon } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react'
import styles from './IconButton.module.css'

type SizeEnum = 'sm' | 'md' | 'lg' | 'xl'

const buildClass = (size: SizeEnum, active: boolean, className = '') => {
  const activeClass = active ? styles.active : ''
  const parentClass = className
  return `${styles.wrap} ${size} ${parentClass} ${activeClass}`
}

type IconButtonProps = {
  icon: Icon
  active?: boolean
  size?: SizeEnum
} & ButtonHTMLAttributes<HTMLButtonElement>
const IconButton = ({
  icon,
  className = '',
  onClick,
  size = 'md',
  active = false,
  ...rest
}: IconButtonProps) => {
  const Icon = icon
  const _className = buildClass(size, active, className)
  return (
    <button className={_className} onClick={onClick} {...rest}>
      <Icon size="1em" />
    </button>
  )
}

export default IconButton
