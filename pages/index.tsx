import React, { useEffect, useRef, useState } from "react"
import { animateSelectionSort } from "../algorithms-helper/selection-sort"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"
import { SortButton } from "../components/SortButton"
import { generateBarHeights, changeBarsColor } from "../utils/index"
import { Button, ButtonGroup, Slider, Spacer, Text } from "@geist-ui/react"
import { AlgorithmSelector } from "../components/AlgorithmSelector"
import { INACTIVE_BAR_COLOR } from "../constants"
import { SortingAlgorithms, SortingSpeeds, SortingState } from "../types"
import { animateInsertionSort } from "../algorithms-helper/insertion-sort"
import { default as Head } from "next/head"
import { animateBubbleSort } from "../algorithms-helper/bubble-sort"
import { Github } from "@geist-ui/react-icons"
// @ts-ignore
import styles from "../styles/Home.module.css"

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

const activeSortingSpeedBtn: React.CSSProperties = {
  backgroundColor: "#000",
  color: "#fff",
}

const sortingSpeedTable: SortingSpeeds = {
  slow: 160,
  normal: 80,
  fast: 40,
}

const Home: React.FC = () => {
  const [barHeights, setBarHeights] = useState([])
  const [sortState, setSortState] = useState<SortingState>("Sort")
  const [barLength, setBarLength] = useState(70)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | string[]>(
    "Selection"
  )
  const [sortingSpeed, setSortingSpeed] = useState<keyof SortingSpeeds>("normal")

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
            width: 330,
            boxShadow: "5px 0 10px #efefef",
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
              <Button
                style={sortingSpeed === "slow" ? activeSortingSpeedBtn : undefined}
                onClick={() => setSortingSpeed("slow")}>
                Slow
              </Button>
              <Button
                style={sortingSpeed === "normal" ? activeSortingSpeedBtn : undefined}
                onClick={() => setSortingSpeed("normal")}>
                Normal
              </Button>
              <Button
                style={sortingSpeed === "fast" ? activeSortingSpeedBtn : undefined}
                onClick={() => setSortingSpeed("fast")}>
                Fast
              </Button>
            </ButtonGroup>
          </div>
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
            onClick={() => {
              resetBars()
              resetBarColors()
            }}
            type="error">
            Reset
          </Button>
          <Spacer y={1.7} />
          <a
            className={styles["github-icon-wrapper"]}
            href="https://github.com/danilhendrasr/sorting-visualizer"
            target="_blank">
            <Github size={20} color="#000" />
          </a>
          <Text size=".7em">
            &copy; {new Date().getFullYear()} - Danil Hendra Suryawan
          </Text>
        </div>
        <div
          style={{
            justifyContent: "center",
            width: "calc(100vw - 330px)",
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
