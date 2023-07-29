import { useContext } from 'react'
import { CapabilitiesContext } from '.'

/**
 * Custom hook to access the CapabilitiesContext
 */
export default function () {
  return useContext(CapabilitiesContext)
}
