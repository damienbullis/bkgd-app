/** @throws {Error} - If browser is not Chrome */
export default function checkBrowser() {
  // Get the user-agent string
  const userAgentString = navigator.userAgent
  // Detect Chrome
  let chromeAgent = userAgentString.indexOf('Chrome') > -1

  // Detect Safari
  let safariAgent = userAgentString.indexOf('Safari') > -1

  // Discard Safari since it also matches Chrome
  if (chromeAgent && safariAgent) safariAgent = false

  // Detect Opera
  const operaAgent = userAgentString.indexOf('OP') > -1

  // Discard Chrome since it also matches Opera
  if (chromeAgent && operaAgent) chromeAgent = false

  if (!chromeAgent) throw new Error('Chrome is required')
}
