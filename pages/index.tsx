import { useState } from "react"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"

export default function Home() {
  const [bars] = useState([10, 20, 30, 10, 20, 30, 10, 20, 30])

  const elements = bars.map((value, idx) => <Bar height={value} />)

  return <ChartWrapper bars={elements} />
}
