import { useState } from "react"

export default function Home() {
  const [bars, setBars] = useState([10, 20, 30])

  const elements = bars.map((value, idx) => (
    <div
      key={idx}
      style={{ width: "20px", height: `${value}px`, backgroundColor: "yellow" }}></div>
  ))

  return (
    <div className="flex w-11/12 mx-auto h-screen bg-black space-x-4">{elements}</div>
  )
}
