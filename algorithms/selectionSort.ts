export const selectionSort = (inputArray: number[]): [number[][], [number, number][]] => {
  let animationSequence: [number, number][] = []
  let unsortedArray = [...inputArray]
  let arrayState: number[][] = []

  for (let x = 0; x < unsortedArray.length; x++) {
    let currentMinHasChanged = false
    let currentMin = unsortedArray[x]
    let currentMinIdx = x

    // These indexes will be stored as an item in the animation sequence array
    let selectedBars: [number, number] = [currentMinIdx, currentMinIdx]

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
