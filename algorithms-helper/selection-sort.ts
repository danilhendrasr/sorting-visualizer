import { AnimateFunctionParams, SwapTypeAnimationStep } from "../types"
import {
  changeBarsColor,
  postSortAnimation,
  makeBarsActive,
  getNumberValueFromElementHeight,
} from "../utils"

type SelectionSortAnimationStep = Pick<SwapTypeAnimationStep, "compare" | "swap"> & {
  mark?: [number, number]
}

export const selectionSort = (array: number[]) => {
  const arrayLength = array.length
  const animations: SelectionSortAnimationStep[] = []

  for (let i = 0; i < arrayLength; i++) {
    let minIdx = i
    for (let j = i + 1; j < arrayLength; j++) {
      animations.push({ compare: [i, j] })
      if (array[minIdx] > array[j]) minIdx = j
    }

    animations.push({ mark: [i, minIdx] })
    animations.push({ swap: [i, minIdx] })
    ;[array[i], array[minIdx]] = [array[minIdx], array[i]]
  }

  return animations
}

export const animateSelectionSort = (params: AnimateFunctionParams) => {
  const { bars, palette, sortingSpeed, callback } = params
  const barHeights = bars.map((bar) => getNumberValueFromElementHeight(bar.style.height))
  const animations = selectionSort(barHeights)

  let prevActiveBars = []
  animations.forEach((item, idx) => {
    setTimeout(() => {
      if (idx > 0) changeBarsColor(prevActiveBars, palette.idle)

      if (item.hasOwnProperty("compare")) {
        const activeBars = item.compare.map((barIdx) => bars[barIdx])
        changeBarsColor(activeBars, palette.compare)
        prevActiveBars = activeBars
      } else if (item.hasOwnProperty("mark")) {
        const activeBars = item.mark.map((barIdx) => bars[barIdx])
        changeBarsColor(activeBars, palette.wrongOrder)
        prevActiveBars = activeBars
      } else if (item.hasOwnProperty("swap")) {
        const activeBars = item.swap.map((barIdx) => bars[barIdx])
        const heights = activeBars.map((bar) =>
          getNumberValueFromElementHeight(bar.style.height)
        )
        makeBarsActive(
          [
            { element: activeBars[0], height: heights[1] },
            { element: activeBars[1], height: heights[0] },
          ],
          palette.swap
        )
        prevActiveBars = activeBars
      }

      if (callback && idx === animations.length - 1) {
        changeBarsColor(prevActiveBars, palette.idle)
        postSortAnimation(bars, palette.correctOrder)
        callback()
      }
    }, idx * sortingSpeed)
  })
}
