import { AnimateFunctionParams, AnimationStep } from "../types"
import {
  changeBarsColor,
  getNumberValueFromElementHeight,
  postSortAnimation,
} from "../utils"

interface mergeSortParams {
  array: number[]
  start: number
  end: number
  animationStepsHolder: AnimationStep[]
}

interface mergeParams extends mergeSortParams {
  mid: number
}

const merge = (params: mergeParams) => {
  let { array, start, mid, end, animationStepsHolder } = params
  let start2 = mid + 1

  while (start <= mid && start2 <= end) {
    animationStepsHolder.push({ compare: [start, start2] })
    if (array[start] < array[start2]) {
      animationStepsHolder.push({ correctOrder: [start, start2] })
      start++
    } else {
      animationStepsHolder.push({ wrongOrder: [start, start2] })
      animationStepsHolder.push({ swap: [start, start2] })
      const valueToMove = array[start2]
      let idxToShiftFrom = start2

      while (idxToShiftFrom > start) {
        array[idxToShiftFrom] = array[idxToShiftFrom - 1]
        idxToShiftFrom--
      }
      array[start] = valueToMove

      start++
      mid++
      start2++
    }
  }
}

const mergeSort = (params: mergeSortParams) => {
  const { array, start, end, animationStepsHolder } = params
  if (start >= end) return

  const mid = Math.floor(start + (end - start) / 2)
  mergeSort({
    array,
    start,
    end: mid,
    animationStepsHolder: animationStepsHolder,
  })
  mergeSort({
    array,
    start: mid + 1,
    end,
    animationStepsHolder: animationStepsHolder,
  })
  merge({ array, start, mid, end, animationStepsHolder: animationStepsHolder })
}

const animateMergeSort = (params: AnimateFunctionParams) => {
  const { bars, palette, sortingSpeed, callback } = params
  const array = bars.map((bar) =>
    getNumberValueFromElementHeight(bar.style.height)
  )

  const animationSteps: AnimationStep[] = []
  mergeSort({
    array,
    start: 0,
    end: array.length - 1,
    animationStepsHolder: animationSteps,
  })

  let previousOp: "compare" | "swap" = "compare"
  let previousActiveBars: HTMLElement[]
  animationSteps.forEach((animation, idx) => {
    setTimeout(() => {
      if (idx > 0) {
        changeBarsColor(previousActiveBars, palette.idle)
      }

      if (animation.compare) {
        previousOp = "compare"
        const barsToOperate = animation.compare.map((idx) => bars[idx])
        changeBarsColor(barsToOperate, palette.compare)
        previousActiveBars = barsToOperate
      } else if (animation.wrongOrder) {
        const barsToOperate = animation.wrongOrder.map((idx) => bars[idx])
        changeBarsColor(barsToOperate, palette.wrongOrder)
        previousActiveBars = barsToOperate
      } else if (animation.correctOrder) {
        const barsToOperate = animation.correctOrder.map((idx) => bars[idx])
        changeBarsColor(barsToOperate, palette.correctOrder)
        previousActiveBars = barsToOperate
      } else if (animation.swap) {
        const [idx1, idx2] = animation.swap
        const movedBarHeight = bars[idx2].style.height
        const barsToOperate = bars.slice(idx1, idx2 + 1)

        for (let i = idx2; i > idx1; i--) {
          bars[i].style.backgroundColor = palette.correctOrder
          bars[i].style.height = bars[i - 1].style.height
        }

        bars[idx1].style.backgroundColor = palette.swap
        bars[idx1].style.height = movedBarHeight

        previousActiveBars = barsToOperate
      }

      if (idx === animationSteps.length - 1 && callback) {
        changeBarsColor(previousActiveBars, palette.idle)
        callback()
        postSortAnimation(bars, palette.correctOrder)
      }
    }, idx * sortingSpeed)
  })
}

export { animateMergeSort }
