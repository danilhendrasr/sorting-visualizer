interface InsertionAnimationSequence {
  idx: number
  moveFrom: number
  shift: number
}

export const insertionSort = (arrayToSort: number[]): InsertionAnimationSequence[] => {
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
