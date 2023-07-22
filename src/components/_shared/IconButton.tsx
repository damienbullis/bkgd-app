import { Icon } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react'
import Button from './Button'
import styles from './IconButton.module.css'

const sizes = {
  sm: '1.618rem',
  md: '2.618rem',
  lg: '4.236rem',
  xl: '6.854rem',
} as const

const buildClass = (
  size: keyof typeof sizes,
  active: boolean,
  className?: string
) => {
  const activeClass = active ? styles.active : ''
  const parentClass = className || ''
  const sizeClass = sizes[size]
  return `${styles.wrap} ${sizeClass} ${parentClass} ${activeClass}`
}

type IconButtonProps = {
  icon: Icon
  active?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
} & ButtonHTMLAttributes<HTMLButtonElement>
const IconButton = ({
  icon,
  className,
  onClick,
  size = 'md',
  active = false,
}: IconButtonProps) => {
  const Icon = icon
  const _className = buildClass(size, active, className)
  return (
    <Button className={_className} onClick={onClick}>
      <Icon size="inherit" />
    </Button>
  )
}

export default IconButton
