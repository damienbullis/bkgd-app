import { useState } from 'react'

type Mode = 'tools' | 'edit'

export default function Controls() {
  const [mode, setMode] = useState<Mode>('tools')
  return (
    <section id="controls">
      {mode === 'tools' && <div>Tools</div>}
      {mode === 'edit' && <div>Edit</div>}
    </section>
  )
}
