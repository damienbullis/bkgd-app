import { Spiral } from '@phosphor-icons/react'

export default function Pending() {
  return (
    <div className="fixed inset-0 grid place-items-center">
      <Spiral className="animate-spin text-4xl text-white" />
    </div>
  )
}
