import { createContext } from 'react'

type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>]
const ModalContext = createContext<ModalContextType | null>(null)

export default ModalContext
