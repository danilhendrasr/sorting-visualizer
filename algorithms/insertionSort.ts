/**
 * Sort the given array using insertion sort algorithm
 * @param arrayToSort Array of number, representing the unsorted array
 */
export const insertionSort = (arrayToSort: number[]): number[] => {
  let sortedArray: number[] = []

  for (let i = 0; i < arrayToSort.length; i++) {
    const isFirstIteration: boolean = i === 0
    if (isFirstIteration) {
      sortedArray.push(arrayToSort[i])
      continue
    }

    let currentItem = arrayToSort[i]
    for (let x = sortedArray.length - 1; x >= 0; x--) {
      const isLastInnerIteration: boolean = x === 0

      let leftSide: number = sortedArray[x - 1] ?? -Infinity
      let rightSide: number = sortedArray[x]

      if (leftSide >= currentItem && currentItem <= rightSide) {
        const aboveXIdx = sortedArray.splice(x)
        sortedArray.push(currentItem)
        sortedArray = sortedArray.concat(aboveXIdx)
        break
      } else if (isLastInnerIteration) {
        sortedArray.push(currentItem)
      }
    }
  }

  return sortedArray
}
