import { useEffect, useState } from "react"
import { Button, Spacer } from "@geist-ui/react"
import { Check, Play } from "@geist-ui/react-icons"
import { SortingState } from "../types"

interface SortButtonProps {
  sortState: SortingState
  onClick: () => void
}

export const SortButton: React.FC<SortButtonProps> = (props) => {
  const { sortState, onClick: _onClick } = props
  const [text, setText] = useState<SortingState>("Sort")

  useEffect(() => {
    if (sortState !== text) setText(sortState)
  }, [sortState])

  let isSorting = text === "Sorting"
  let isSorted = text === "Sorted"
  const onClick = () => {
    if (isSorted) return
    _onClick()
  }

  return (
    <Button
      loading={isSorting}
      onClick={onClick}
      shadow={text === "Sort"}
      style={text === "Sorted" ? { pointerEvents: "none" } : undefined}
      type="secondary">
      {text === "Sort" && <Play size={15} />}
      {isSorted && (
        <>
          <Check size={20} />
        </>
      )}
      <Spacer inline x={0.2} />
      {text}
    </Button>
  )
}
