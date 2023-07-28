function calculateAverageColor(pixels: Uint8ClampedArray) {
  let totalR = 0
  let totalG = 0
  let totalB = 0
  const pixelCount = pixels.length / 4

  for (let i = 0; i < pixels.length; i += 4) {
    totalR += pixels[i]
    totalG += pixels[i + 1]
    totalB += pixels[i + 2]
  }

  const avgR = totalR / pixelCount
  const avgG = totalG / pixelCount
  const avgB = totalB / pixelCount

  return `rgb(${avgR}, ${avgG}, ${avgB})`
}

function getPixelsFrom(id: string) {
  const el = document.getElementById(id)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (id === null || el === null || ctx === null) {
    return
  }
  canvas.width = el.clientWidth
  canvas.height = el.clientHeight

  // Draw the content of the div onto the canvas
  const data = new XMLSerializer().serializeToString(el)
  const img = new Image()
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data)

  ctx.drawImage(img, 0, 0, el.clientWidth, el.clientHeight)
  const pixels = ctx.getImageData(0, 0, el.clientWidth, el.clientHeight).data
  const averageColor = calculateAverageColor(pixels)

  // Now you can use the averageColor to calculate the contrast ratio and adjust the font color.
  // Code for calculating contrast ratio and adjusting font color goes here
  // ...

  // For example, to change the font color to white if the contrast ratio is below 4.5:
  // if (contrastRatio < 4.5) {
  //   el.style.color = '#fff'; // Change font color to white
  // }
  return averageColor
}

function adjustFontColor() {
  const averageColor = getPixelsFrom('bkgd')
  const textColor = '#000' // Default font color
  console.log({ averageColor, textColor })
  // Calculate contrast ratio between averageColor and textColor
  // and decide whether to change the font color or not.
  // If the contrast ratio is below the threshold, change the font color.

  // Code for calculating contrast ratio and adjusting font color goes here

  // Example logic:
  // const contrastRatio = calculateContrastRatio(averageColor, textColor);
  // if (contrastRatio < 4.5) {
  //   document.getElementById('myDiv').style.color = '#fff'; // Change font color to white
  // }
}

export default adjustFontColor
