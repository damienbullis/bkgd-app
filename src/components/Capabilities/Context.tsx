import { createContext } from 'react'

function detectBrowserCapabilities() {
  const capabilities: Record<string, unknown> = {}
  if (!window) return capabilities

  // Check color gamut support
  capabilities.sRGB = window.matchMedia('(color-gamut: srgb)').matches
  capabilities.displayP3 = window.matchMedia('(color-gamut: p3)').matches
  capabilities.rec2020 = window.matchMedia('(color-gamut: rec2020)').matches

  // Check for color preference (light or dark mode)
  capabilities.darkModePreferred = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  // Get browser information
  capabilities.browserInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    cookiesEnabled: navigator.cookieEnabled,
  }

  return capabilities
}

const CapabilitiesContext = createContext<Record<string, unknown>>({})

const CapabilitiesProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CapabilitiesContext.Provider value={detectBrowserCapabilities()}>
      {children}
    </CapabilitiesContext.Provider>
  )
}

export { CapabilitiesProvider, CapabilitiesContext }
