import { useContext } from "react"
import { Button, Spacer } from "@geist-ui/react"
import { Check, Play } from "@geist-ui/react-icons"
import { AppStateContext } from "../contexts/app-state"

interface Props {
  onClick: () => void
}

export const SortButton: React.FC<Props> = ({ onClick }) => {
  const sortingState = useContext(AppStateContext).sortingState

  const isIdle = sortingState === "Sort"
  const isSorting = sortingState === "Sorting"
  const isSorted = sortingState === "Sorted"

  return (
    <Button
      loading={isSorting}
      onClick={onClick}
      shadow={isIdle}
      style={isSorted ? { pointerEvents: "none" } : undefined}
      type="secondary">
      {isIdle && <Play size={15} />}
      {isSorted && <Check size={20} />}
      <Spacer inline x={0.2} />
      {sortingState}
    </Button>
  )
}
