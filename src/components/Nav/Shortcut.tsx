type ModifiersEnum = 'Cntl' | 'Shift' | 'Alt'

const buildModifiers = (modifiers?: (ModifiersEnum | 'Cmd')[]) => {
  return modifiers?.map((m) => {
    switch (m) {
      case 'Cntl':
        return '⌃ '
      case 'Cmd':
        return '⌘ '
      case 'Shift':
        return '⇧ '
      case 'Alt':
        return '⌥ '
      default:
        return ''
    }
  })
}

export default function Shortcut({
  label,
  value,
  modifiers,
}: {
  label: string
  value: string
  modifiers?: ModifiersEnum[]
}) {
  // check if OS is a Mac
  const isMac = window.navigator.platform.includes('Mac')
  // const capabilities = useCapabilities()
  const controlKey = isMac ? 'Cmd' : 'Cntl'
  const modifierKeys =
    modifiers?.map((m) => (m === 'Cntl' ? controlKey : m)) || []

  return (
    <p className="-mx-2 inline-flex items-center gap-2 rounded-md p-2 py-1 text-sm font-light hover:bg-white hover:bg-opacity-20">
      {label}
      <span className="ml-auto inline-flex items-center gap-2 font-normal">
        {(modifierKeys?.length
          ? buildModifiers(modifierKeys)?.join(' + ') + ' + '
          : '') + value}
      </span>
    </p>
  )
}
