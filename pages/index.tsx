// @ts-ignore
import styles from "../styles/Home.module.scss"

import React, { useEffect, useState } from "react"
import {
  changeBarsColor,
  generateBarHeights,
  getAllBars,
  hexToRgb,
  startAnimation,
} from "../utils"
import {
  AppTitle,
  AlgorithmSelector,
  ArrayLengthModifier,
  Bar,
  Footer,
  LinkToRepo,
  ResetButton,
  SortButton,
  SpeedControl,
} from "../components"
import { Spacer, useTheme } from "@geist-ui/react"
import { sortingSpeedTable } from "../constants"
import { SortingAlgorithms, SortingSpeeds, SortingState } from "../types"
import { default as Head } from "next/head"
import { AppStateContext } from "../contexts/app-state"

const getBarElementsFromBarHeights = (barHeights: number[]) => {
  const bars = barHeights.map((heightValue, idx) => (
    <Bar
      height={heightValue}
      key={idx}
      width={Math.floor(window.innerWidth / barHeights.length) / 2}
    />
  ))

  return bars
}

const Home: React.FC = () => {
  const { palette: geistUIPalette } = useTheme()
  const palette = {
    active: geistUIPalette.foreground,
    inactive: geistUIPalette.errorLight,
  }

  const [barHeights, setBarHeights] = useState<number[]>([])
  const [sortingState, setSortingState] = useState<SortingState>("Sort")
  const [arrayLength, setArrayLength] = useState(70)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithms>(
    "Selection"
  )
  const [sortingSpeed, setSortingSpeed] = useState<keyof SortingSpeeds>("normal")

  useEffect(resetBars, [arrayLength])
  useEffect(resetBars, [selectedAlgorithm])

  function resetBars() {
    const newBarHeights = generateBarHeights(arrayLength)
    setBarHeights(newBarHeights)
    setSortingState("Sort")
    requestAnimationFrame(() => {
      const barsDomEl = getAllBars()
      const sampleBg = barsDomEl[5].style.backgroundColor
      if (sampleBg === hexToRgb(palette.active)) {
        changeBarsColor(barsDomEl, palette.inactive)
      }
    })
  }

  function triggerAnimation() {
    setSortingState("Sorting")
    startAnimation({
      barHeights,
      palette,
      sortingAlgorithm: selectedAlgorithm,
      sortingSpeed: sortingSpeedTable[sortingSpeed],
      callback: () => setSortingState("Sorted"),
    })
  }

  return (
    <>
      <Head>
        <title>Sorting Algorithms Visualizer</title>
      </Head>

      <div className={styles.container}>
        <AppStateContext.Provider value={{ sortingState }}>
          <div className={styles.sidebarContainer}>
            <Spacer y={1} />
            <AppTitle />
            <Spacer y={1} />
            <AlgorithmSelector
              onChange={setSelectedAlgorithm}
              selectedAlgorithm={selectedAlgorithm}
            />
            <ArrayLengthModifier
              onChange={(value) => setArrayLength(value)}
              value={arrayLength}
            />
            <Spacer y={0.5} />
            <SpeedControl
              onSpeedChange={(speed: keyof SortingSpeeds) => setSortingSpeed(speed)}
              sortingSpeed={sortingSpeed}
            />
            <Spacer y={1.5} />
            <SortButton onClick={triggerAnimation} />
            <Spacer y={0.6} />
            <ResetButton onClick={resetBars} />
            <Spacer y={1.7} />
            <LinkToRepo />
            <Footer />
          </div>
        </AppStateContext.Provider>
        <div className={styles.barsContainer}>
          {getBarElementsFromBarHeights(barHeights)}
        </div>
      </div>
    </>
  )
}

export default Home
