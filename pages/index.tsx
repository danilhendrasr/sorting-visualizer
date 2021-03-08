// @ts-ignore
import styles from "../styles/Home.module.scss"

import React, { useEffect, useState } from "react"
import {
  changeBarsColor,
  generateBarHeights,
  getAllBars,
  sortingSpeedTable,
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
import { Spacer } from "@geist-ui/react"
import { INACTIVE_BAR_COLOR } from "../constants"
import { SortingAlgorithms, SortingSpeeds, SortingState } from "../types"
import { default as Head } from "next/head"

const Home: React.FC = () => {
  const [barHeights, setBarHeights] = useState([])
  const [sortState, setSortState] = useState<SortingState>("Sort")
  const [barLength, setBarLength] = useState(70)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("Selection")
  const [sortingSpeed, setSortingSpeed] = useState<keyof SortingSpeeds>("normal")

  useEffect(resetBars, [barLength])
  useEffect(resetBars, [selectedAlgorithm])

  function resetBars(): void {
    const newBarHeights = generateBarHeights(barLength)
    setBarHeights(newBarHeights)
    setSortState("Sort")
    requestAnimationFrame(() => {
      const barsDomEl = getAllBars()
      if (barsDomEl[5].style.backgroundColor === "rgb(17, 17, 17)") {
        changeBarsColor(barsDomEl, INACTIVE_BAR_COLOR)
      }
    })
  }

  function triggerAnimation(): void {
    setSortState("Sorting")
    startAnimation(
      selectedAlgorithm as SortingAlgorithms,
      barHeights,
      sortingSpeedTable[sortingSpeed],
      () => setSortState("Sorted")
    )
  }

  return (
    <>
      <Head>
        <title>Sorting Algorithms Visualizer</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.sidebarContainer}>
          <Spacer y={1} />
          <AppTitle />
          <Spacer y={1} />
          <AlgorithmSelector
            disabled={sortState === "Sorting"}
            onChangeHandler={setSelectedAlgorithm}
            selectedAlgorithm={selectedAlgorithm}
          />
          <ArrayLengthModifier
            disabled={sortState === "Sorting"}
            onChange={(value) => setBarLength(value)}
            value={barLength}
          />
          <Spacer y={0.5} />
          <SpeedControl
            disabled={sortState === "Sorting"}
            onSpeedChange={(speed: keyof SortingSpeeds) => setSortingSpeed(speed)}
            sortingSpeed={sortingSpeed}
          />
          <Spacer y={1.5} />
          <SortButton onClick={triggerAnimation} sortState={sortState} />
          <Spacer y={0.6} />
          <ResetButton disabled={sortState === "Sorting"} onClick={resetBars} />
          <Spacer y={1.7} />
          <LinkToRepo />
          <Footer />
        </div>
        <div className={styles.barsContainer}>
          {barHeights.map((heightValue, idx) => (
            <Bar
              height={heightValue}
              key={idx}
              width={Math.floor(window.innerWidth / barLength) / 2}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
