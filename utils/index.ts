import { animateBubbleSort } from "../algorithms-helper/bubble-sort"
import { animateInsertionSort } from "../algorithms-helper/insertion-sort"
import { animateSelectionSort } from "../algorithms-helper/selection-sort"
import { ACTIVE_BAR_COLOR } from "../constants"
import { ActiveBar, SortingAlgorithms, SortingSpeeds } from "../types"

export const generateARandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateBarHeights = (amountOfBar: number): number[] => {
  let newBarHeights: Set<number> = new Set<number>()
  while (newBarHeights.size < amountOfBar) {
    const randomHeight = generateARandomNumber(1, 100)
    newBarHeights.add(randomHeight)
  }
  return Array.from(newBarHeights)
}

const isSingleHTMLElement = (
  element: HTMLElement | HTMLCollectionOf<HTMLElement> | HTMLElement[]
): element is HTMLElement => {
  const isHTMLCollection = HTMLCollection.prototype.isPrototypeOf(element)
  const isArray = Array.isArray(element)

  if (isHTMLCollection) {
    return false
  } else if (isArray) {
    return false
  } else {
    return true
  }
}

export const changeBarsColor = (
  bar: HTMLElement | HTMLCollectionOf<HTMLElement> | HTMLElement[],
  endColor: string
): void => {
  if (!isSingleHTMLElement(bar)) {
    for (let i = 0; i < bar.length; i++) {
      bar[i].style.backgroundColor = endColor
    }
  } else {
    bar.style.backgroundColor = endColor
  }
}

export const makeBarsActive = (bars: ActiveBar[]): void => {
  for (const bar of bars) {
    changeBarsColor(bar.element, ACTIVE_BAR_COLOR)
    bar.element.style.height = `${bar.height}%`
  }
}

export const getAllBars = (): HTMLCollectionOf<HTMLElement> => {
  const bars = document.getElementsByClassName("bar") as HTMLCollectionOf<HTMLElement>
  return bars
}

export const postSortAnimation = (
  bars: HTMLCollectionOf<HTMLElement>,
  endColor: string
): void => {
  for (let n = 0; n < bars.length; n++) {
    setTimeout(() => {
      let nThBar = bars[n]
      changeBarsColor(nThBar, endColor)
    }, n * 10)
  }
}

export const getNumberFromHeightString = (height: string): number => {
  const unitlessHeight = height.replace(
    /(cm|mm|in|px|pt|pc|em|rem|vw|vh|vmin|vmax|ex|ch|%)$/,
    ""
  )

  return parseInt(unitlessHeight)
}

export const sortingSpeedTable: SortingSpeeds = {
  slow: 160,
  normal: 80,
  fast: 40,
}

interface StartAnimationParams {
  barHeights: number[]
  sortingAlgorithm: SortingAlgorithms
  sortingSpeed: number
  callback?: () => void
}

export const startAnimation = (params: StartAnimationParams): void => {
  const { barHeights, sortingAlgorithm, sortingSpeed, callback } = params

  switch (sortingAlgorithm) {
    case "Selection":
      animateSelectionSort(barHeights, sortingSpeed, callback)
      break
    case "Insertion":
      animateInsertionSort(barHeights, sortingSpeed, callback)
      break
    case "Bubble":
      animateBubbleSort(barHeights, sortingSpeed, callback)
      break
  }
}
