import React, { useEffect, useState } from "react"
import { animateSelectionSort } from "../algorithms-helper/selection-sort"
import { Bar } from "../components/Bar"
import { SortButton } from "../components/SortButton"
import { ArrayLengthModifier } from "../components/ArrayLengthModifier"
import {
  generateBarHeights,
  changeBarsColor,
  getAllBars,
  sortingSpeedTable,
} from "../utils/index"
import { Button, ButtonGroup, Slider, Spacer, Text } from "@geist-ui/react"
import { AlgorithmSelector } from "../components/AlgorithmSelector"
import { INACTIVE_BAR_COLOR } from "../constants"
import { SortingAlgorithms, SortingSpeeds, SortingState } from "../types"
import { animateInsertionSort } from "../algorithms-helper/insertion-sort"
import { default as Head } from "next/head"
import { animateBubbleSort } from "../algorithms-helper/bubble-sort"
import { Github } from "@geist-ui/react-icons"
// @ts-ignore
import homeStyles from "../styles/Home.module.scss"
import { SpeedControl } from "../components/SpeedControl"
import { LinkToRepo } from "../components/LinkToRepo"
import { Footer } from "../components/Footer"

const startAnimation = (
  sortingAlgorithm: SortingAlgorithms,
  barHeights: number[],
  sortingSpeed: number,
  callback?: () => void
): void => {
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

const Home: React.FC = () => {
  const [barHeights, setBarHeights] = useState([])
  const [sortState, setSortState] = useState<SortingState>("Sort")
  const [barLength, setBarLength] = useState(70)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | string[]>(
    "Selection"
  )
  const [sortingSpeed, setSortingSpeed] = useState<keyof SortingSpeeds>("normal")

  const resetBars = (): void => {
    const newBarHeights = generateBarHeights(barLength)
    setBarHeights(newBarHeights)
    setSortState("Sort")
    window.requestAnimationFrame(() => {
      const barsDomEl = getAllBars()
      if (barsDomEl[5].style.backgroundColor === "rgb(17, 17, 17)") {
        changeBarsColor(barsDomEl, INACTIVE_BAR_COLOR)
      }
    })
  }

  useEffect(resetBars, [barLength])
  useEffect(resetBars, [selectedAlgorithm])

  return (
    <>
      <Head>
        <title>Sorting Algorithms Visualizer</title>
      </Head>

      <div className={homeStyles.container}>
        <div className={homeStyles.sidebarContainer}>
          <Spacer y={1} />
          <Text h1 size="2em" className={homeStyles.textCenter}>
            Sorting Algorithms Visualizer
          </Text>
          <Spacer y={1} />
          <AlgorithmSelector
            containerClass={homeStyles.sideBarInputContainer}
            disabled={sortState === "Sorting"}
            selectedAlgorithm={selectedAlgorithm}
            onChangeHandler={setSelectedAlgorithm}
          />
          <ArrayLengthModifier
            containerClass={homeStyles.sideBarInputContainer}
            disabled={sortState === "Sorting"}
            value={barLength}
            onChange={(value) => setBarLength(value)}
          />
          <Spacer y={0.5} />
          <SpeedControl
            sortingSpeed={sortingSpeed}
            sortState={sortState}
            onSpeedChange={(speed: keyof SortingSpeeds) => setSortingSpeed(speed)}
          />
          <Spacer y={1.5} />
          <SortButton
            sortState={sortState}
            clickAction={() => {
              setSortState("Sorting")
              startAnimation(
                selectedAlgorithm as SortingAlgorithms,
                barHeights,
                sortingSpeedTable[sortingSpeed],
                () => setSortState("Sorted")
              )
            }}
          />
          <Spacer y={0.6} />
          <Button
            disabled={sortState === "Sorting"}
            ghost
            onClick={resetBars}
            type="error">
            Reset
          </Button>
          <Spacer y={1.7} />
          <LinkToRepo />
          <Footer />
        </div>
        <div className={homeStyles.barsContainer}>
          {barHeights.map((heightValue, idx) => (
            <Bar
              key={idx}
              height={heightValue}
              width={Math.floor(window.innerWidth / barLength) / 2}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
