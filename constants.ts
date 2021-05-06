import { SortingAlgorithms, SortingSpeeds } from "./types"

export const ALGORITHMS_LIST: SortingAlgorithms[] = [
  "Selection",
  "Insertion",
  "Bubble",
  "Merge",
]
export const sortingSpeedTable: SortingSpeeds = {
  slow: 800,
  normal: 30,
  fast: 5,
}
