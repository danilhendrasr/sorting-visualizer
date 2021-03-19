export type SortingState = "Sort" | "Sorting" | "Sorted"
export type ActiveBar = { element: HTMLElement; height: number }
export type SortingAlgorithms = "Selection" | "Insertion" | "Bubble" | "Merge"
export interface SortingSpeeds {
  slow: number
  normal: number
  fast: number
}
export interface AnimateFunctionParams {
  barHeights: number[]
  bars: HTMLElement[]
  palette: { active: string; inactive: string; swapping: string }
  sortingSpeed: number
  callback?: () => void
}
