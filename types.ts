export type SortingState = "Sort" | "Sorting" | "Sorted"
export type ActiveBar = { element: HTMLElement; height: number }
export type SortingAlgorithms = "Selection" | "Insertion" | "Bubble"
export interface SortingSpeeds {
  slow: number
  normal: number
  fast: number
}
