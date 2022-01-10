/* eslint-disable no-var */
import confetti from 'canvas-confetti'

const duration = 15 * 1000
const animationEnd = Date.now() + duration
const defaults = { startVelocity: 30, spread: 360, ticks: 120, zIndex: 0 }

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

const intervalFireworks = setInterval(function () {
  const timeLeft = animationEnd - Date.now()

  if (timeLeft <= 0) {
    return clearInterval(intervalFireworks)
  }

  const particleCount = 50 * (timeLeft / duration)
  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    })
  )
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    })
  )
}, 250)

// go Buckeyes!
var colors = ['#bb0000', '#ffffff']
var endSchoolPride = Date.now() + 15 * 1000

export const frameSchoolPride = () => {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  })
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  })

  if (Date.now() < endSchoolPride) {
    requestAnimationFrame(frameSchoolPride)
  }
}

export default intervalFireworks
