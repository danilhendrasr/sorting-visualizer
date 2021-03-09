import { ActiveBar, AnimateFunctionParams } from "../types"
import { changeBarsColor, getAllBars, makeBarsActive, postSortAnimation } from "../utils"

const selectionSort = (inputArray: number[]) => {
  let animationSequence: [number, number][] = []
  let unsortedArray = [...inputArray]
  let arrayState: number[][] = []

  for (let x = 0; x < unsortedArray.length; x++) {
    let currentMinHasChanged = false
    let currentMin = unsortedArray[x]
    let currentMinIdx = x

    // These indexes will be stored as an item in the animation sequence array
    let selectedBars = [currentMinIdx, currentMinIdx] as [number, number]

    for (let y = x + 1; y < unsortedArray.length; y++) {
      let currentItem = unsortedArray[y]

      if (currentItem < currentMin) {
        currentMin = currentItem
        currentMinIdx = y
        currentMinHasChanged = true
      }
    }

    if (currentMinHasChanged) {
      // Swap current value with the new currentMin value
      let temp = unsortedArray[currentMinIdx]
      unsortedArray[currentMinIdx] = unsortedArray[x]
      unsortedArray[x] = temp

      // currentMin value has changed, so we need to reassign selectedBars[1]
      selectedBars[1] = currentMinIdx
    }

    animationSequence.push(selectedBars)

    // Spread operator is needed to create a shallow copy of the current unsortedArray
    arrayState.push([...unsortedArray])
  }

  return [arrayState, animationSequence]
}

export const animateSelectionSort = (params: AnimateFunctionParams) => {
  const { barHeights, palette, sortingSpeed, callback } = params
  const [arrayStates, animationSequence] = selectionSort(barHeights)
  const bars = getAllBars()

  for (let i = 0; i < animationSequence.length; i++) {
    let firstIteration = i === 0
    let lastIteration = i === animationSequence.length - 1

    const [bar1Idx, bar2Idx] = animationSequence[i]

    const activeBar1 = bars[bar1Idx]
    const activeBar2 = bars[bar2Idx]

    const activeBar1Height = arrayStates[i][bar2Idx]
    const activeBar2Height = arrayStates[i][bar1Idx]

    let barsToActiveBars: ActiveBar[] = [
      {
        element: activeBar1,
        height: activeBar2Height,
      },
      {
        element: activeBar2,
        height: activeBar1Height,
      },
    ]

    setTimeout(() => {
      if (!firstIteration) {
        // Reset previously active bars' color
        let prevAnimationSequence = animationSequence[i - 1]
        let [prevBar1Idx, prevBar2Idx] = prevAnimationSequence
        let previousActiveBars = [bars[prevBar1Idx], bars[prevBar2Idx]]
        changeBarsColor(previousActiveBars, palette.inactive)
      }

      makeBarsActive(barsToActiveBars, palette.active)

      if (lastIteration) {
        // Revert the last bar to an inactive bar
        setTimeout(() => {
          let lastBar = activeBar1
          changeBarsColor(lastBar, palette.inactive)

          // Because this animate function executes asynchronous function (setTimeout)
          // if we wanted to do something right after this function is done running,
          // we have to put the code inside the last setTimeout.
          // Otherwise, the code will get executed without waiting for the setTimeouts
          // to get executed.
          postSortAnimation(bars, palette.active)
          if (callback) callback()
        }, sortingSpeed)
      }
    }, i * sortingSpeed)
  }
}
