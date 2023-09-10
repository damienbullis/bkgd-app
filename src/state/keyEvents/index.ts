export function setupKeyboardEvents(document: Document) {
  console.log(setupKeyboardEvents.name)
  document.addEventListener('keydown', (event) => {
    console.log(event)

    // FEATURE: add keyboard shortcuts
    // FEATURE: add event modifiers

    if (event.key === 'Escape') console.log('Escape')
    if (event.key === 'Enter') console.log('Enter')
    if (event.key === 'ArrowUp') console.log('ArrowUp')
    if (event.key === 'ArrowDown') console.log('ArrowDown')
    if (event.altKey) console.log('altKey')
    if (event.ctrlKey) console.log('ctrlKey')
    if (event.metaKey) console.log('metaKey')
    if (event.shiftKey) console.log('shiftKey')
  })
}
