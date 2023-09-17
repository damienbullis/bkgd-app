import { useContext, useEffect } from 'react'
import { KeyEventsContext } from '@state/keyEvents'
import { useVisible } from '@state/global'
import { EventHandler } from '@state/events'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import IconButton from '../_shared/IconButton'

export default function VisibilityButton({
  onClick,
}: {
  onClick?: () => void
}) {
  const [hide] = useVisible()
  const keys = useContext(KeyEventsContext)
  useEffect(() => {
    const unsub = keys.subscribe((e) => {
      if (e.key === 't') {
        EventHandler({
          action: 'toggle-ui',
          payload: null,
        })
      }
    })

    return () => {
      unsub()
    }
  }, [keys])

  return <IconButton icon={hide ? EyeClosed : Eye} onClick={onClick} />
}
