import { AnimateFunctionParams } from "../types"
import { changeBarsColor, getNumberFromHeightString, postSortAnimation } from "../utils"

interface animationHolder {
  compare?: [number, number]
  idxToInsertTo?: number
  moveFromIdx?: number
  shift?: number
}

interface mergeSortParams {
  array: number[]
  start: number
  end: number
  animationHolder: animationHolder[]
}

interface mergeParams extends mergeSortParams {
  mid: number
}

const merge = (params: mergeParams) => {
  let { array, start, mid, end, animationHolder: animations } = params
  let start2 = mid + 1

  while (start <= mid && start2 <= end) {
    animations.push({ compare: [start, start2] })
    if (array[start] < array[start2]) {
      start++
    } else {
      animations.push({
        idxToInsertTo: start,
        moveFromIdx: start2,
        shift: start2 - start,
      })
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
  const { array, start, end, animationHolder } = params
  if (start >= end) return

  const mid = Math.floor(start + (end - start) / 2)
  mergeSort({ array, start, end: mid, animationHolder })
  mergeSort({ array, start: mid + 1, end, animationHolder })
  merge({ array, start, mid, end, animationHolder })
}

const animateMergeSort = (params: AnimateFunctionParams) => {
  const { bars, palette, sortingSpeed, callback } = params
  const array = bars.map((bar) => getNumberFromHeightString(bar.style.height))
  // TODO: Add more key to the animation steps. E.g: correctOrder, wrongOrder, etc.
  const animations = []
  mergeSort({ array, start: 0, end: array.length - 1, animationHolder: animations })

  let previousOp: "compare" | "swap" = "compare"
  let previousActiveBars: HTMLElement[] = []
  animations.forEach((animation: animationHolder, idx) => {
    setTimeout(() => {
      if (idx > 0 && previousOp === "compare") {
        setTimeout(() => {
          const [idx1, idx2] = animations[idx - 1].compare
          changeBarsColor([bars[idx1], bars[idx2]], palette.idle)
        }, 5)
      }

      if (animation.compare) {
        previousOp = "compare"
        const [idx1, idx2] = animation.compare
        const barsToOperate = [bars[idx1], bars[idx2]]
        changeBarsColor(barsToOperate, palette.compare)
        previousActiveBars = barsToOperate
      } else {
        const { idxToInsertTo, moveFromIdx } = animation
        previousOp = "swap"
        const barToMoveHeight = bars[moveFromIdx].style.height
        for (let x = moveFromIdx; x > idxToInsertTo; x--) {
          bars[x].style.height = bars[x - 1].style.height
        }
        bars[idxToInsertTo].style.height = barToMoveHeight
      }

      if (idx === animations.length - 1 && callback) {
        changeBarsColor(previousActiveBars, palette.idle)
        callback()
        postSortAnimation(bars, palette.compare)
      }
    }, idx * sortingSpeed)
  })
}

export { animateMergeSort }
