import { AnimateFunctionParams } from "../types"
import {
  changeBarsColor,
  postSortAnimation,
  makeBarsActive,
  getNumberValueFromElementHeight,
} from "../utils"

interface SelectionSortAnimationItem {
  compare?: [number, number]
  swap?: [number, number]
}

export const selectionSort = (unsortedArray: number[]) => {
  const array = unsortedArray.slice()
  const arrayLength = array.length
  // TODO: Add more key to the animation steps. E.g: correctOrder, wrongOrder, etc.
  const animations: SelectionSortAnimationItem[] = []

  for (let i = 0; i < arrayLength; i++) {
    let minIdx = i
    for (let j = i + 1; j < arrayLength; j++) {
      if (array[minIdx] > array[j]) {
        minIdx = j
      }
      animations.push({ compare: [i, j] })
    }

    animations.push({ swap: [i, minIdx] })
    ;[array[i], array[minIdx]] = [array[minIdx], array[i]]
  }

  return animations
}

export const animateSelectionSort = (params: AnimateFunctionParams) => {
  const { bars, palette, sortingSpeed, callback } = params
  const barHeights = bars.map((bar) => getNumberValueFromElementHeight(bar.style.height))
  const animations = selectionSort(barHeights)
  let previousActiveIdxs = []
  animations.forEach((item, idx) => {
    setTimeout(() => {
      if (idx > 0) {
        if (!animations[idx - 1].swap) {
          const previousItem = animations[idx - 1].compare
          changeBarsColor([bars[previousItem[0]], bars[previousItem[1]]], palette.idle)
        }
      }

      if (item.compare) {
        const [idx1, idx2] = item.compare
        previousActiveIdxs.push([idx1, idx2])
        changeBarsColor([bars[idx1], bars[idx2]], palette.compare)
      } else if (item.swap) {
        const [idx1, idx2] = item.swap
        const heights = [
          getNumberValueFromElementHeight(bars[idx1].style.height),
          getNumberValueFromElementHeight(bars[idx2].style.height),
        ]
        makeBarsActive(
          [
            { element: bars[idx1], height: heights[1] },
            { element: bars[idx2], height: heights[0] },
          ],
          palette.swap
        )
      }

      if (callback && idx === animations.length - 1) {
        postSortAnimation(bars as any, palette.compare)
        callback()
      }
    }, idx * sortingSpeed)
  })
}
