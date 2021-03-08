import { SortingAlgorithms, SortingSpeeds } from "./types"

export const ACTIVE_BAR_COLOR = "#111"
export const INACTIVE_BAR_COLOR = "#ff1a1a"
export const ALGORITHMS_LIST: SortingAlgorithms[] = ["Selection", "Insertion", "Bubble"]
export const sortingSpeedTable: SortingSpeeds = {
  slow: 160,
  normal: 80,
  fast: 40,
}
