import { ACTIVE_BAR_COLOR, INACTIVE_BAR_COLOR, SORTING_SPEED } from "../constants"
import {
  changeBarsColor,
  getAllBars,
  getNumberFromHeightString,
  makeBarsActive,
  postSortAnimation,
} from "../utils"

const bubbleSort = (array: number[]): [number, number][] => {
  let animaSeq: [number, number][] = []
  let copyArray: number[] = [...array]

  let isSortingDone: boolean = false
  while (!isSortingDone) {
    for (let i = 0; i < copyArray.length - 1; i++) {
      const isInLastPosition = i === copyArray.length - 1
      if (isInLastPosition) break

      const left: number = copyArray[i]
      const right: number = copyArray[i + 1]

      if (left > right) {
        const temp = right
        copyArray[i + 1] = left
        copyArray[i] = temp
        animaSeq.push([i, i + 1])
      }
    }

    let isArraySorted: boolean = true
    for (let j = 0; j < copyArray.length - 1; j++) {
      const left: number = copyArray[j]
      const right: number = copyArray[j + 1]

      if (left > right) isArraySorted = false
    }

    if (isArraySorted) isSortingDone = true
  }

  return animaSeq
}

export const animateBubbleSort = (barHeights: number[], callback?: () => void): void => {
  const animationSequence = bubbleSort(barHeights)
  const bars = getAllBars()

  animationSequence.forEach((activeBarIdxs, iteration) => {
    const [firstBarIdx, secondBarIdx] = activeBarIdxs
    setTimeout(() => {
      const isFirstIteration = iteration === 0
      if (!isFirstIteration) {
        const [prevFirstBarIdx, prevSecondBarIdx] = animationSequence[iteration - 1]

        changeBarsColor(
          [bars[prevFirstBarIdx], bars[prevSecondBarIdx]],
          INACTIVE_BAR_COLOR
        )
      }

      const activeBarHeights = [
        getNumberFromHeightString(bars[firstBarIdx].style.height),
        getNumberFromHeightString(bars[secondBarIdx].style.height),
      ]

      makeBarsActive([
        { element: bars[firstBarIdx], height: activeBarHeights[1] },
        { element: bars[secondBarIdx], height: activeBarHeights[0] },
      ])

      const isLastIteration = iteration === animationSequence.length - 1
      if (isLastIteration && callback) {
        postSortAnimation(bars, ACTIVE_BAR_COLOR)
        callback()
      }
    }, iteration * SORTING_SPEED)
  })
}
