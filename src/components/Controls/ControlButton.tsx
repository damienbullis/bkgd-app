import { Icon } from '@phosphor-icons/react'
import HoverText from '../_shared/HoverText'
import IconButton from '../_shared/IconButton'

type Props = {
  icon: Icon
  title: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}

export default function ControlButton({
  icon,
  title,
  onClick,
  disabled = false,
  active = false,
}: Props) {
  return (
    <li className="group relative flex">
      <IconButton
        icon={icon}
        onClick={onClick}
        disabled={disabled}
        active={active}
      />
      <HoverText>{title}</HoverText>
    </li>
  )
}
