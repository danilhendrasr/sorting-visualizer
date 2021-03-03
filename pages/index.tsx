import React, { useEffect, useRef, useState } from "react"
import { animateSelectionSort } from "../algorithms-helper/selection-sort"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"
import { SortButton } from "../components/SortButton"
import { generateBarHeights, changeBarsColor } from "../utils/index"
import { Button, ButtonGroup, Slider, Spacer, Text } from "@geist-ui/react"
import { AlgorithmSelector } from "../components/AlgorithmSelector"
import { INACTIVE_BAR_COLOR } from "../constants"
import { SortingAlgorithms, SortingState } from "../types"
import { animateInsertionSort } from "../algorithms-helper/insertion-sort"
import { default as Head } from "next/head"
import { animateBubbleSort } from "../algorithms-helper/bubble-sort"
import { Github } from "@geist-ui/react-icons"
// @ts-ignore
import styles from "../styles/Home.module.css"

const startAnimation = (
  sortingAlgorithm: SortingAlgorithms,
  barHeights: number[],
  callback?: () => void
): void => {
  switch (sortingAlgorithm) {
    case "Selection":
      animateSelectionSort(barHeights, callback)
      break
    case "Insertion":
      animateInsertionSort(barHeights, callback)
      break
    case "Bubble":
      animateBubbleSort(barHeights, callback)
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

  const barsEl = useRef<HTMLDivElement[]>([])

  const bars = barHeights.map((heightValue, idx) => (
    <Bar
      key={idx}
      height={heightValue}
      width={Math.floor(window.innerWidth / barLength) / 2}
      elRef={(element) => (barsEl.current[idx] = element)}
    />
  ))

  const resetBars = (): void => {
    const newBarHeights = generateBarHeights(barLength)
    barsEl.current.length = newBarHeights.length
    setBarHeights(newBarHeights)
    setSortState("Sort")
  }

  const resetBarColors = (): void => {
    // requestAnimationFrame is used to defer the function execution after
    // the browser has finished painting.
    window.requestAnimationFrame(() => {
      changeBarsColor(barsEl.current, INACTIVE_BAR_COLOR)
    })
  }

  useEffect(() => {
    resetBars()
    console.log(barsEl.current)
  }, [barLength])

  useEffect(() => {
    resetBars()
    resetBarColors()
  }, [selectedAlgorithm])

  return (
    <>
      <Head>
        <title>Sorting Algorithms Visualizer</title>
      </Head>

      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 366,
          }}>
          <Spacer y={1} />
          <Text h1 size="2em" style={{ textAlign: "center" }}>
            Sorting Algorithms Visualizer
          </Text>
          <Spacer y={2} />
          <div>
            <Text style={{ marginBottom: "5px" }}>Select Algorithm</Text>
            <AlgorithmSelector
              disabled={sortState === "Sorting" ? true : false}
              selectedAlgorithm={selectedAlgorithm}
              onChangeHandler={setSelectedAlgorithm}
            />
          </div>
          <div style={{ width: "200px" }}>
            <Text style={{ marginBottom: "10px" }}>Length of array</Text>
            <Slider
              disabled={sortState === "Sorting"}
              min={10}
              max={100}
              onChange={(value) => setBarLength(value)}
              showMarkers
              step={10}
              style={{ width: "100%" }}
              value={barLength}
            />
          </div>
          <Spacer y={0.6} />
          <div style={{ width: "200px" }}>
            <Text style={{ marginBottom: "3px" }}>Speed</Text>
            <ButtonGroup
              disabled={sortState === "Sorting"}
              ghost
              size="small"
              style={{ margin: "5px" }}
              type="secondary">
              <Button>Slow</Button>
              <Button>Normal</Button>
              <Button>Fast</Button>
            </ButtonGroup>
          </div>
          <Spacer y={1.5} />
          <SortButton
            sortState={sortState}
            clickAction={() => {
              setSortState("Sorting")
              startAnimation(selectedAlgorithm as SortingAlgorithms, barHeights, () =>
                setSortState("Sorted")
              )
            }}
          />
          <Spacer y={0.6} />
          <Button
            disabled={sortState === "Sorting"}
            ghost
            onClick={() => {
              resetBars()
              resetBarColors()
            }}
            type="error">
            Reset
          </Button>
          <Spacer y={2.5} />
          <a
            className={styles["github-icon-wrapper"]}
            href="https://github.com/danilhendrasr/sorting-visualizer"
            target="_blank">
            <Github size={20} color="#000" />
          </a>
        </div>
        <div
          style={{
            justifyContent: "center",
            width: "calc(100vw - 366px)",
            alignItems: "center",
            height: "80%",
            alignSelf: "flex-end",
          }}>
          <ChartWrapper bars={bars} />
        </div>
      </div>
    </>
  )
}

export default Home
