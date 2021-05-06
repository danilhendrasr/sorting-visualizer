import { AnimateFunctionParams, AnimationStep } from "../types"
import {
  getAllBars,
  changeBarsColor,
  postSortAnimation,
  getNumberValueFromElementHeight,
} from "../utils"

const getInsertionSortAnimationSteps = (inputArray: number[]) => {
  let animationSteps: AnimationStep[] = []
  const array = [...inputArray]

  for (let i = 1; i < array.length; i++) {
    const currentItem = array[i]

    let greaterLeftSideExists = false
    for (let j = i - 1; j >= 0; j--) {
      animationSteps.push({ compare: [i, j] })
      const leftSide = array[j]

      if (currentItem <= leftSide) {
        if (j === 0) {
          animationSteps.push({ wrongOrder: [i, j] })
          animationSteps.push({ swap: [i, j] })
          const tempArray = array.slice(j, i)
          array[j] = currentItem
          array.splice(j + 1, tempArray.length, ...tempArray)
          break
        }

        animationSteps.push({ wrongOrder: [i, j] })
        greaterLeftSideExists = true
      } else {
        if (greaterLeftSideExists) {
          animationSteps.push({ correctOrder: [i, j] })
          animationSteps.push({ swap: [i, j + 1] })
          const tempArray = array.slice(j + 1, i)
          array[j + 1] = currentItem
          array.splice(j + 2, tempArray.length, ...tempArray)
          break
        }

        animationSteps.push({ correctOrder: [i, j] })
        break
      }
    }
  }

  return animationSteps
}

export const animateInsertionSort = (params: AnimateFunctionParams) => {
  const { palette, sortingSpeed, callback } = params
  const bars = Array.from(getAllBars())
  const barHeights = bars.map((bar) =>
    getNumberValueFromElementHeight(bar.style.height)
  )
  console.log(barHeights)
  const animationSteps = getInsertionSortAnimationSteps(barHeights)

  let prevActiveBars: HTMLElement[]
  animationSteps.forEach((step, idx) => {
    setTimeout(() => {
      if (prevActiveBars) changeBarsColor(prevActiveBars, palette.idle)

      if (step.compare) {
        prevActiveBars = step.compare.map((idx) => bars[idx])
        changeBarsColor(prevActiveBars, palette.compare)
      } else if (step.correctOrder) {
        prevActiveBars = step.correctOrder.map((idx) => bars[idx])
        changeBarsColor(prevActiveBars, palette.correctOrder)
      } else if (step.wrongOrder) {
        prevActiveBars = step.wrongOrder.map((idx) => bars[idx])
        changeBarsColor(prevActiveBars, palette.wrongOrder)
      } else if (step.swap) {
        const [idx1, idx2] = step.swap
        prevActiveBars = bars.slice(idx2, idx1 + 1)

        const movedBarHeight = bars[idx1].style.height

        for (let i = idx1; i > idx2; i--) {
          bars[i].style.backgroundColor = palette.swap
          bars[i].style.height = bars[i - 1].style.height
        }

        bars[idx2].style.backgroundColor = palette.swap
        bars[idx2].style.height = movedBarHeight
      }

      if (idx === animationSteps.length - 1) {
        changeBarsColor(prevActiveBars, palette.idle)
        callback()
        postSortAnimation(bars, palette.correctOrder)
      }
    }, idx * sortingSpeed)
  })
}
