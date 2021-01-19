import React, { useEffect, useState } from "react"
import { selectionSort } from "../algorithms/selectionSort"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"
import { SortButton } from "../components/SortButton"

const generateRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateNewBars = (amount: number): number[] => {
  let newBars: number[] = []
  for (let i = 0; i < amount; i++) {
    let randomNumber = generateRandomNumber(0, 100)
    newBars.push(randomNumber)
  }

  return newBars
}

const _selectionSort = (bars: number[]): void => {
  const [arrayStates, animationSequence] = selectionSort(bars)
  const barsEl = document.getElementsByClassName("bar")

  for (let i = 0; i < animationSequence.length; i++) {
    const [firstBarIdx, secondBarIdx] = animationSequence[i]

    if (firstBarIdx === secondBarIdx) continue

    const firstBar = barsEl[firstBarIdx]
    const secondBar = barsEl[secondBarIdx]

    // @ts-ignore
    const firstBarStyle = firstBar.style
    // @ts-ignore
    const secondBarStyle = secondBar.style

    setTimeout(() => {
      let firstIteration = i === 0
      if (!firstIteration) {
        let [prevFirstBarIdx, prevSecondBarIdx] = animationSequence[i - 1]
        let prevFirstBar = barsEl[prevFirstBarIdx]
        let prevSecondBar = barsEl[prevSecondBarIdx]

        prevFirstBar.classList.remove("bg-black")
        prevFirstBar.classList.add("bg-red-600")

        prevSecondBar.classList.remove("bg-black")
        prevSecondBar.classList.add("bg-red-600")
      }

      firstBar.classList.remove("bg-red-600")
      firstBar.classList.add("bg-black")

      secondBar.classList.remove("bg-red-600")
      secondBar.classList.add("bg-black")

      firstBarStyle.height = `${arrayStates[i][firstBarIdx]}%`
      secondBarStyle.height = `${arrayStates[i][secondBarIdx]}%`
    }, i * 50)
  }
}

const Home: React.FC = () => {
  const [bars, setBars] = useState([])

  const elements = bars.map((value, idx) => <Bar key={idx} height={value} />)

  useEffect(() => {
    const newBars = generateNewBars(150)
    setBars(newBars)
  }, [])

  return (
    <div className="h-screen mt-8 mx-auto">
      <ChartWrapper bars={elements} />
      <SortButton clickAction={() => _selectionSort(bars)} />
    </div>
  )
}

export default Home
