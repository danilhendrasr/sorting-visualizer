import { animateBubbleSort } from "../algorithms-helper/bubble-sort"
import { animateInsertionSort } from "../algorithms-helper/insertion-sort"
import { animateSelectionSort } from "../algorithms-helper/selection-sort"
import { ActiveBar, SortingAlgorithms } from "../types"

export const generateARandomNumber = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateBarHeights = (amountOfBar: number) => {
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
  const bars = document.getElementsByClassName("bar") as HTMLCollectionOf<HTMLElement>
  return bars
}

export const postSortAnimation = (
  bars: HTMLCollectionOf<HTMLElement>,
  endColor: string
) => {
  for (let n = 0; n < bars.length; n++) {
    setTimeout(() => {
      let nThBar = bars[n]
      changeBarsColor(nThBar, endColor)
    }, n * 10)
  }
}

export const getNumberFromHeightString = (height: string) => {
  const unitlessHeight = height.replace(
    /(cm|mm|in|px|pt|pc|em|rem|vw|vh|vmin|vmax|ex|ch|%)$/,
    ""
  )

  return parseInt(unitlessHeight)
}

interface StartAnimationParams {
  barHeights: number[]
  bars
  palette: { active: string; inactive: string; swapping: string }
  sortingAlgorithm: SortingAlgorithms
  sortingSpeed: number
  callback?: () => void
}

export const startAnimation = (params: StartAnimationParams) => {
  const { barHeights, bars, palette, sortingAlgorithm, sortingSpeed, callback } = params
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
  }
}

export const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }

  return result ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : null
}
