import { ACTIVE_BAR_COLOR, INACTIVE_BAR_COLOR } from "../constants"
import { ActiveBar } from "../types"

export const generateARandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateBarHeights = (amountOfBar: number): number[] => {
  let newBarHeights: number[] = []
  for (let i = 0; i < amountOfBar; i++) {
    let randomHeight = generateARandomNumber(1, 101)
    newBarHeights.push(randomHeight)
  }

  return newBarHeights
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
