import { useState } from "react"

export const SortButton: React.FC<{ clickAction: () => void }> = (props) => {
  const [text, setText] = useState("Sort!")
  const { clickAction } = props
  return (
    <button
      disabled={text === "Sorting!"}
      className="border rounded-md text-white bg-black font-bold shadow-md px-5 py-2 mx-auto w-32 block mt-8 transition-all disabled:opacity-60 disabled:bg-gray-400"
      onClick={() => {
        clickAction()
        setText("Sorting!")
      }}>
      {text}
    </button>
  )
}
