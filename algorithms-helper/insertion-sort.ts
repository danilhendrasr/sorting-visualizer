// TODO: Refactor all helper functions in this file
import { AnimateFunctionParams } from "../types"
import { getAllBars, changeBarsColor, makeBarsActive, postSortAnimation } from "../utils"

interface InsertionAnimationSequence {
  idx: number
  moveFrom: number
  shift: number
}

const insertionSort = (arrayToSort: number[]): InsertionAnimationSequence[] => {
  // TODO: Add more key to the animation steps. E.g: correctOrder, wrongOrder, etc.
  let animaSeq: InsertionAnimationSequence[] = []
  let sortedArray: number[] = []

  for (let i = 0; i < arrayToSort.length; i++) {
    const currentItem = arrayToSort[i]

    const isFirstIteration = i === 0
    if (isFirstIteration) {
      animaSeq.push({ idx: 0, moveFrom: i, shift: 0 })
      sortedArray.push(currentItem)
      continue
    }

    for (let j = sortedArray.length - 1; j >= 0; j--) {
      const isLastInneriteration = j === 0

      const leftSide = isLastInneriteration ? -Infinity : sortedArray[j - 1]
      const rightSide = sortedArray[j]

      const isLeftSideLesser = leftSide <= currentItem
      const isRightSideGreater = currentItem <= rightSide

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

export const animateInsertionSort = (params: AnimateFunctionParams) => {
  const { barHeights, palette, sortingSpeed, callback } = params
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
        changeBarsColor(bars[animationSequence[i - 1].idx], palette.idle)
      }

      prevIdxBarHeights.push(bars[idxToInsertTo].style.height)
      makeBarsActive(
        [{ element: bars[idxToInsertTo], height: barHeights[barToMove] }],
        palette.compare
      )
    }, i * sortingSpeed)

    for (let x = 1; x <= rightShift; x++) {
      setTimeout(() => {
        prevIdxBarHeights.push(bars[idxToInsertTo + x].style.height)
        bars[idxToInsertTo + x].style.height = prevIdxBarHeights[x - 1]

        const isLastInnerIteration = x === rightShift
        if (isLastInnerIteration && isLastIteration) {
          changeBarsColor(bars[idxToInsertTo], palette.idle)
          postSortAnimation(bars, palette.compare)
          if (callback) callback()
        }
      }, i * sortingSpeed)
    }
  }
}
