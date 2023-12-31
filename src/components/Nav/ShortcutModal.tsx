import { Dialog, Transition } from '@headlessui/react'
import { HandGrabbing, XCircle } from '@phosphor-icons/react'
import { useModal } from '@shared'
import { KeyEventsContext } from '@state/keyEvents'
import { Fragment, useContext, useEffect } from 'react'
import Shortcut from './Shortcut'
// import { useCapabilities } from '../Capabilities'

export default function ShortcutModal() {
  const [isOpen, setIsOpen] = useModal()
  const close = () => setIsOpen(false)
  const keys = useContext(KeyEventsContext)

  const isMac = window.navigator.platform.includes('Mac')

  useEffect(() => {
    // set up subscriptions
    const unSub = keys.subscribe((e) => {
      if (e.ctrlKey && e.key === 'p') {
        setIsOpen((prev) => !prev)
      }
    })
    return () => {
      // tear down subscriptions
      unSub()
    }
  }, [keys, setIsOpen])
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" open={isOpen} onClose={close} className="relative z-10">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950 bg-opacity-20" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-[2]"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-[2]"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg p-6 text-left align-middle shadow-xl filter backdrop-blur-md backdrop-brightness-50 transition-all">
                <Dialog.Title
                  as="div"
                  className="inline-flex w-full items-center gap-2 text-lg font-medium uppercase leading-6 text-gray-100"
                >
                  Shortcuts
                  <span className="ml-0 text-lg"></span>
                  <Shortcut label="" value="P" modifiers={['Cntl']} />
                  <button
                    className="ml-auto text-2xl text-gray-100 hover:text-white"
                    onClick={close}
                  >
                    <XCircle />
                  </button>
                </Dialog.Title>
                <div className="mt-6 grid auto-rows-auto grid-cols-2 gap-4 gap-y-0">
                  <p className="col-span-2 inline-flex w-full items-center text-sm font-light">
                    Duplicate Layer
                    <span className="ml-auto inline-flex items-center gap-1">
                      While dragging{' '}
                      <HandGrabbing className="translate-y-[-2px] text-xl" />
                      <b>
                        {' + '} {isMac ? '⌘' : '⌃'}
                      </b>
                    </span>
                  </p>
                </div>
                <div className="mt-2 grid auto-rows-auto grid-cols-2 gap-4 gap-y-0 border-t border-gray-100 border-opacity-10 pt-2">
                  <Shortcut label="Edit" value={'E'} />
                  <Shortcut label="Toggle UI" value={'T'} />
                </div>
                <div className="mt-2 grid auto-rows-auto grid-cols-2 gap-4 gap-y-0 border-t border-gray-100 border-opacity-10 pt-2">
                  <Shortcut label="Noise" value={'N'} />
                  <Shortcut label="Conic" value={'C'} />
                  <Shortcut label="Radial" value={'R'} />
                  <Shortcut label="Linear" value={'L'} />
                  <Shortcut label="Solid" value={'S'} />
                </div>
                <div className="mt-2 grid auto-rows-auto grid-cols-2 gap-4 gap-y-0 border-t border-gray-100 border-opacity-10 pt-2">
                  <Shortcut label="Undo" value={'Z'} modifiers={['Cntl']} />
                  <Shortcut
                    label="Redo"
                    value={'Z'}
                    modifiers={['Cntl', 'Shift']}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
