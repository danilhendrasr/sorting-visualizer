import React, { useEffect, useState } from "react"
import { selectionSort } from "../algorithms/selectionSort"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"
import { SortButton } from "../components/SortButton"
import { generateNewBars } from "../utils/index"

/**
 * Tailwind class of the active bar
 */
const ACTIVE_BAR_CLASS = "bg-black"

/**
 * Tailwind class of the default bar
 */
const DEFAULT_BAR_CLASS = "bg-red-600"

/**
 * Sorting speed in miliseconds
 */
const SORTING_SPEED = 50

interface changeElementClassParam {
  add?: string
  remove?: string
}

/**
 * Change an element's classList, can be adding or removing item from classList depending on the
 * 2nd param's properties
 * @param element A bar DOM element which will be modified
 * @param operations An object containing 2 optional property, add and remove. The presence
 * of one or both of it will determine what kind of operation will be done to the classList
 */
const changeElementClass = (
  element: Element,
  operations: changeElementClassParam
): void => {
  let isAdd = operations.add
  let isRemove = operations.remove
  let isRemoveAndAdd = isRemove && isAdd

  if (isRemoveAndAdd) {
    element.classList.remove(operations.remove)
    element.classList.add(operations.add)
  } else if (isAdd) {
    element.classList.add(operations.add)
  } else if (isRemove) {
    element.classList.remove(operations.remove)
  }
}

/**
 * Revert each bar in the given collection bars from active bar to default bar
 * @param bars HTMLCollection of bar elements
 */
const revertBarsColor = (bars: Element[]): void => {
  for (const bar of bars) {
    changeElementClass(bar, {
      add: DEFAULT_BAR_CLASS,
      remove: ACTIVE_BAR_CLASS,
    })
  }
}

/**
 * Turn 2 previously active bars back into default bars
 * @param prevBarsIndexes Previous bars' indexes in the current DOM
 * @param barDomElements Array/HTMLCollection of the bar's DOM elemnt
 */
const revertPreviousBarsColors = (
  prevBarsIndexes: [number, number],
  barDomElements: HTMLCollectionOf<Element>
): void => {
  let [prevBar1Idx, prevBar2Idx] = prevBarsIndexes

  let prevActiveBar1 = barDomElements[prevBar1Idx]
  let prevActiveBar2 = barDomElements[prevBar2Idx]

  let previousActiveBars = [prevActiveBar1, prevActiveBar2]

  revertBarsColor(previousActiveBars)
}

type BarToActiveBar = { element: Element; newHeight: number }

/**
 * Turn each bar element in the bars param into an active bar
 * @param bars Array of object, each item is an object containing the element which
 * will be changed and the new height for that element
 */
const makeBarsActive = (bars: BarToActiveBar[]): void => {
  for (const bar of bars) {
    changeElementClass(bar.element, {
      add: ACTIVE_BAR_CLASS,
      remove: DEFAULT_BAR_CLASS,
    })

    // @ts-ignore
    bar.element.style.height = `${bar.newHeight}%`
  }
}

/**
 * Turn every bar in the DOM into an active bar (black bar) one by one, from first bar to last bar
 * @param barsEl Array/HTML Collection of the bar's DOM elements
 */
const postSortAnimation = (barsEl: HTMLCollectionOf<Element>): void => {
  for (let s = 0; s < barsEl.length; s++) {
    setTimeout(() => {
      let sThBar = barsEl[s]

      changeElementClass(sThBar, {
        remove: DEFAULT_BAR_CLASS,
        add: ACTIVE_BAR_CLASS,
      })
    }, s * 10)
  }
}

const animateSelectionSort = (bars: number[]): void => {
  const [arrayStates, animationSequence] = selectionSort(bars)
  const barDomElements = document.getElementsByClassName("bar")

  for (let i = 0; i < animationSequence.length; i++) {
    let firstIteration = i === 0
    let lastIteration = i === animationSequence.length - 1

    const [bar1Idx, bar2Idx] = animationSequence[i]

    const activeBar1 = barDomElements[bar1Idx]
    const activeBar2 = barDomElements[bar2Idx]

    const activeBar1Height = arrayStates[i][bar2Idx]
    const activeBar2Height = arrayStates[i][bar1Idx]

    setTimeout(() => {
      if (!firstIteration) {
        let prevAnimationSequence = animationSequence[i - 1]
        revertPreviousBarsColors(prevAnimationSequence, barDomElements)
      }

      let barsToActiveBars: BarToActiveBar[] = [
        {
          element: activeBar1,
          newHeight: activeBar2Height,
        },
        {
          element: activeBar2,
          newHeight: activeBar1Height,
        },
      ]

      makeBarsActive(barsToActiveBars)

      if (lastIteration) {
        setTimeout(() => {
          let lastBar = activeBar1
          revertBarsColor([lastBar])

          postSortAnimation(barDomElements)
        }, SORTING_SPEED)
      }
    }, i * SORTING_SPEED)
  }
}

const Home: React.FC = () => {
  const [barHeights, setBarHeights] = useState([])

  const bars = barHeights.map((heightValue, idx) => (
    <Bar key={idx} height={heightValue} />
  ))

  useEffect(() => {
    const newBarHeights = generateNewBars(150)
    setBarHeights(newBarHeights)
  }, [])

  return (
    <div className="h-screen mt-8 mx-auto">
      <ChartWrapper bars={bars} />
      <SortButton clickAction={() => animateSelectionSort(barHeights)} />
    </div>
  )
}

export default Home
