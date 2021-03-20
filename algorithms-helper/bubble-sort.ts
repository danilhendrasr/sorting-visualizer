import { AnimateFunctionParams } from "../types"
import {
  changeBarsColor,
  getNumberValueFromElementHeight,
  postSortAnimation,
} from "../utils"

interface AnimationStep {
  compare?: [number, number]
  wrongOrder?: [number, number]
  correctOrder?: [number, number]
  swap?: [number, number]
}

const getBubbleSortAnimationSteps = (array: number[]) => {
  const animationSteps = [] as AnimationStep[]

  const arLength = array.length
  for (let x = 0; x < arLength; x++) {
    let swapHappens = false
    for (let y = 0; y < arLength - x - 1; y++) {
      const comparedIdxs = [y, y + 1] as [number, number]
      animationSteps.push({ compare: comparedIdxs })
      if (array[y] > array[y + 1]) {
        animationSteps.push({ wrongOrder: comparedIdxs })
        ;[array[y], array[y + 1]] = [array[y + 1], array[y]]
        animationSteps.push({ swap: comparedIdxs })
        swapHappens = true
      } else {
        animationSteps.push({ correctOrder: comparedIdxs })
      }
    }

    if (!swapHappens) break
  }

  return animationSteps
}

const animateBubbleSort = (params: AnimateFunctionParams) => {
  const { bars, palette, sortingSpeed, callback } = params
  const barsHeights = bars.map((bar) => getNumberValueFromElementHeight(bar.style.height))
  const animationSteps = getBubbleSortAnimationSteps(barsHeights)

  let prevActiveBars = [] as HTMLElement[]
  animationSteps.forEach((step, idx) => {
    setTimeout(() => {
      if (idx > 0) {
        changeBarsColor(prevActiveBars, palette.idle)
      }

      if (step.hasOwnProperty("compare")) {
        prevActiveBars = step.compare.map((barIdx) => bars[barIdx])
        changeBarsColor(prevActiveBars, palette.compare)
      } else if (step.hasOwnProperty("wrongOrder")) {
        prevActiveBars = step.wrongOrder.map((barIdx) => bars[barIdx])
        changeBarsColor(prevActiveBars, palette.wrongOrder)
      } else if (step.hasOwnProperty("correctOrder")) {
        prevActiveBars = step.correctOrder.map((barIdx) => bars[barIdx])
        changeBarsColor(prevActiveBars, palette.correctOrder)
      } else {
        prevActiveBars = step.swap.map((barIdx) => bars[barIdx])
        prevActiveBars.forEach((bar) => (bar.style.backgroundColor = palette.swap))
        ;[prevActiveBars[0].style.height, prevActiveBars[1].style.height] = [
          prevActiveBars[1].style.height,
          prevActiveBars[0].style.height,
        ]
      }

      if (idx === animationSteps.length - 1 && callback) {
        changeBarsColor(prevActiveBars, palette.idle)
        postSortAnimation(bars, palette.compare)
        callback()
      }
    }, idx * sortingSpeed)
  })
}

export { animateBubbleSort }
