import { useEffect, useState } from "react"
import { Button, Spacer } from "@geist-ui/react"
import { Check } from "@geist-ui/react-icons"
import { SortingState } from "../types"

interface SortButtonProps {
  clickAction: () => void
  sortState: SortingState
}

export const SortButton: React.FC<SortButtonProps> = (props) => {
  const { sortState, clickAction } = props
  const [text, setText] = useState<SortingState>("Sort")

  useEffect(() => {
    if (sortState !== text) {
      setText(sortState)
    }
  }, [sortState])

  let isSorting = text === "Sorting"
  let isSorted = text === "Sorted"
  const onClick = () => {
    if (isSorted) return
    clickAction()
  }
  return (
    <Button
      disabled={text !== "Sort"}
      loading={isSorting}
      onClick={onClick}
      shadow
      type="secondary">
      {isSorted && (
        <>
          <Check size={20} />
          <Spacer inline x={0.2} />
        </>
      )}
      {text}
    </Button>
  )
}
