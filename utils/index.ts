import { animateBubbleSort } from "../algorithms-helper/bubble-sort"
import { animateInsertionSort } from "../algorithms-helper/insertion-sort"
import { animateSelectionSort } from "../algorithms-helper/selection-sort"
import { ActiveBar, BarColorPalette, SortingAlgorithms } from "../types"
import { animateMergeSort } from "../algorithms-helper/merge-sort"

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getNewArray = (amountOfBars: number) => {
  let newArray: Set<number> = new Set<number>()
  while (newArray.size < amountOfBars) {
    const randomNumber = getRandomNumber(1, 100)
    newArray.add(randomNumber)
  }
  return Array.from(newArray)
}

const isSingleHTMLElement = (
  element: HTMLElement | HTMLCollectionOf<HTMLElement> | HTMLElement[]
): element is HTMLElement => {
  const isHTMLCollection = HTMLCollection.prototype.isPrototypeOf(element)
  const isArray = Array.isArray(element)

  if (isHTMLCollection) {
    return false
  } else return !isArray
}

export const changeBarsColor = (
  bar: HTMLElement | HTMLCollectionOf<HTMLElement> | HTMLElement[],
  endColor: string
) => {
  if (!isSingleHTMLElement(bar)) {
    for (let i = 0; i < bar.length; i++) {
      bar[i].style.backgroundColor = endColor
    }
  } else {
    bar.style.backgroundColor = endColor
  }
}

export const makeBarsActive = (bars: ActiveBar[], activeBarColor: string) => {
  for (const bar of bars) {
    changeBarsColor(bar.element, activeBarColor)
    bar.element.style.height = `${bar.height}%`
  }
}

export const getAllBars = () => {
  return document.getElementsByClassName("bar") as HTMLCollectionOf<HTMLElement>
}

export const postSortAnimation = (
  bars: HTMLCollectionOf<HTMLElement> | HTMLElement[],
  endColor: string
) => {
  for (let n = 0; n < bars.length; n++) {
    setTimeout(() => {
      let nThBar = bars[n]
      changeBarsColor(nThBar, endColor)
    }, n * 10)
  }
}

export const getNumberValueFromElementHeight = (height: string) => {
  const unitlessHeight = height.replace(
    /(cm|mm|in|px|pt|pc|em|rem|vw|vh|vmin|vmax|ex|ch|%)$/,
    ""
  )

  return parseInt(unitlessHeight)
}

interface StartAnimationParams {
  barHeights: number[]
  bars
  palette: BarColorPalette
  sortingAlgorithm: SortingAlgorithms
  sortingSpeed: number
  callback?: () => void
}

export const startAnimation = (params: StartAnimationParams) => {
  const {
    barHeights,
    bars,
    palette,
    sortingAlgorithm,
    sortingSpeed,
    callback,
  } = params
  const animationParams = {
    barHeights,
    bars,
    palette,
    sortingSpeed,
    callback,
  }

  switch (sortingAlgorithm) {
    case "Selection":
      animateSelectionSort(animationParams)
      break
    case "Insertion":
      animateInsertionSort(animationParams)
      break
    case "Bubble":
      animateBubbleSort(animationParams)
      break
    case "Merge":
      animateMergeSort(animationParams)
      break
  }
}

export const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }

  return result ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : null
}
