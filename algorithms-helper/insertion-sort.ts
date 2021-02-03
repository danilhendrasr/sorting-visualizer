import { INACTIVE_BAR_COLOR, SORTING_SPEED, ACTIVE_BAR_COLOR } from "../constants"
import { getAllBars, changeBarsColor, makeBarsActive, postSortAnimation } from "../utils"

interface InsertionAnimationSequence {
  idx: number
  moveFrom: number
  shift: number
}

const insertionSort = (arrayToSort: number[]): InsertionAnimationSequence[] => {
  let animaSeq: InsertionAnimationSequence[] = []
  let sortedArray: number[] = []

  for (let i = 0; i < arrayToSort.length; i++) {
    const currentItem: number = arrayToSort[i]

    const isFirstIteration: boolean = i === 0
    if (isFirstIteration) {
      animaSeq.push({ idx: 0, moveFrom: i, shift: 0 })
      sortedArray.push(currentItem)
      continue
    }

    for (let j = sortedArray.length - 1; j >= 0; j--) {
      const isLastInneriteration: boolean = j === 0

      const leftSide: number = isLastInneriteration ? -Infinity : sortedArray[j - 1]
      const rightSide: number = sortedArray[j]

      const isLeftSideLesser: boolean = leftSide <= currentItem
      const isRightSideGreater: boolean = currentItem <= rightSide

      if (isLeftSideLesser && isRightSideGreater) {
        const aboveRightSide = sortedArray.splice(j)

        animaSeq.push({
          idx: sortedArray.length,
          moveFrom: i,
          shift: aboveRightSide.length,
        })

        sortedArray.push(currentItem)
        sortedArray = sortedArray.concat(aboveRightSide)
        break
      } else if (isLastInneriteration) {
        animaSeq.push({ idx: sortedArray.length, moveFrom: i, shift: 0 })
        sortedArray.push(currentItem)
      }
    }
  }

  return animaSeq
}

export const animateInsertionSort = (
  barHeights: number[],
  callback?: () => void
): void => {
  const animationSequence = insertionSort(barHeights)
  const bars = getAllBars()

  for (let i = 0; i < animationSequence.length; i++) {
    const {
      idx: idxToInsertTo,
      moveFrom: barToMove,
      shift: rightShift,
    } = animationSequence[i]
    const isFirstIteration = i === 0
    const isLastIteration = i === animationSequence.length - 1

    let prevIdxBarHeights = []

    setTimeout(() => {
      if (!isFirstIteration) {
        changeBarsColor(bars[animationSequence[i - 1].idx], INACTIVE_BAR_COLOR)
      }

      prevIdxBarHeights.push(bars[idxToInsertTo].style.height)
      makeBarsActive([{ element: bars[idxToInsertTo], height: barHeights[barToMove] }])
    }, i * SORTING_SPEED)

    for (let x = 1; x <= rightShift; x++) {
      setTimeout(() => {
        prevIdxBarHeights.push(bars[idxToInsertTo + x].style.height)
        bars[idxToInsertTo + x].style.height = prevIdxBarHeights[x - 1]

        const isLastInnerIteration = x === rightShift
        if (isLastInnerIteration && isLastIteration) {
          changeBarsColor(bars[idxToInsertTo], INACTIVE_BAR_COLOR)
          postSortAnimation(bars, ACTIVE_BAR_COLOR)
          if (callback) callback()
        }
      }, i * SORTING_SPEED)
    }
  }
}
