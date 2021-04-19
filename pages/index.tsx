// @ts-ignore
import styles from "../styles/Home.module.scss"

import React from "react"
import {
  changeBarsColor,
  getNewArray,
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
import { Spacer } from "@geist-ui/react"
import { sortingSpeedTable } from "../constants"
import { SortingAlgorithms, SortingSpeeds, SortingState } from "../types"
import Head from "next/head"
import { AppStateContext, BarPaletteCtx } from "../contexts/app-state"

interface HomeState {
  array: number[]
  arrayLength: number
  selectedAlgorithm: SortingAlgorithms
  sortingSpeed: keyof SortingSpeeds
  sortingState: SortingState
}

class Index extends React.Component<{ children: JSX.Element }, HomeState> {
  static contextType = BarPaletteCtx

  constructor(props) {
    super(props)
    this.state = {
      array: [],
      arrayLength: 70,
      selectedAlgorithm: "Selection",
      sortingSpeed: "normal",
      sortingState: "Sort",
    }
  }

  componentDidMount() {
    this.resetBars()
  }

  componentDidUpdate(prevProps, prevState: HomeState) {
    const arrayLengthChanges = prevState.arrayLength !== this.state.arrayLength
    const algorithmChanges =
      prevState.selectedAlgorithm !== this.state.selectedAlgorithm

    if (arrayLengthChanges || algorithmChanges) {
      this.resetBars()
    }
  }

  resetBars = () => {
    const barPalette = this.context
    const { arrayLength } = this.state
    const newArray = getNewArray(arrayLength)
    this.setState({ array: newArray, sortingState: "Sort" })
    requestAnimationFrame(() => {
      const barsDomEl = Array.from(getAllBars())
      const sampleBg = barsDomEl[5].style.backgroundColor
      if (sampleBg === hexToRgb(barPalette.correctOrder)) {
        changeBarsColor(barsDomEl, barPalette.idle)
      }
    })
  }

  startSorting = () => {
    const barPalette = this.context
    this.setState({ sortingState: "Sorting" })
    startAnimation({
      barHeights: this.state.array,
      bars: Array.from(getAllBars()),
      palette: barPalette,
      sortingAlgorithm: this.state.selectedAlgorithm,
      sortingSpeed: sortingSpeedTable[this.state.sortingSpeed],
      callback: () => this.setState({ sortingState: "Sorted" }),
    })
  }

  /**
   * Map array to bar elements
   * @param array Bar heights
   * @param defaultBg Default background color for each bar
   * @returns Bar JSX elements
   */
  arrayToBars = (array: number[], defaultBg: string) => {
    return array.map((heightValue, idx) => (
      <Bar
        defaultBg={defaultBg}
        height={heightValue}
        key={idx}
        width={Math.floor(window.innerWidth / array.length) / 2}
      />
    ))
  }

  render() {
    const barPalette = this.context
    const {
      array,
      sortingState,
      selectedAlgorithm,
      arrayLength,
      sortingSpeed,
    } = this.state

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
                onChange={(newAlgorithm) =>
                  this.setState({ selectedAlgorithm: newAlgorithm })
                }
                selected={selectedAlgorithm}
              />
              <ArrayLengthModifier
                onChange={(value) => this.setState({ arrayLength: value })}
                value={arrayLength}
              />
              <Spacer y={0.5} />
              <SpeedControl
                onSortingSpeedChange={(speed: keyof SortingSpeeds) =>
                  this.setState({ sortingSpeed: speed })
                }
                sortingSpeed={sortingSpeed}
              />
              <Spacer y={1.5} />
              <SortButton onClick={this.startSorting} />
              <Spacer y={0.6} />
              <ResetButton onClick={this.resetBars} />
              <Spacer y={1.7} />
              <LinkToRepo />
              <Footer />
            </div>
          </AppStateContext.Provider>
          <div className={styles.barsContainer}>
            {this.arrayToBars(array, barPalette.idle)}
          </div>
        </div>
      </>
    )
  }
}

export default Index
