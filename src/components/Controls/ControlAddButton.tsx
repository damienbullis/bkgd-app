import { IconButton, HoverText } from '@shared'
import { Icon, Plus } from '@phosphor-icons/react'

type Props = {
  icon: Icon
  title: string
  onClick: () => void
  disabled?: boolean
}

export default function ControlAddButton({
  icon,
  title,
  onClick,
  disabled = false,
}: Props) {
  return (
    <li className="group relative">
      <IconButton icon={icon} onClick={onClick} disabled={disabled} />
      <span className="absolute left-0 top-0 text-base opacity-0 transition-opacity group-hover:opacity-100">
        <Plus weight="bold" />
      </span>
      <HoverText>{title}</HoverText>
    </li>
  )
}
