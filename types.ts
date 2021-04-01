export type SortingState = "Sort" | "Sorting" | "Sorted"
export type ActiveBar = { element: HTMLElement; height: number }
export type SortingAlgorithms = "Selection" | "Insertion" | "Bubble" | "Merge"

export interface BarColorPalette {
  compare: string
  correctOrder: string
  idle: string
  swap: string
  wrongOrder: string
}

export interface SortingSpeeds {
  slow: number
  normal: number
  fast: number
}

export interface AnimateFunctionParams {
  barHeights: number[]
  bars: HTMLElement[]
  palette: BarColorPalette
  sortingSpeed: number
  callback?: () => void
}

export interface SwapTypeAnimationStep {
  compare?: [number, number]
  correctOrder?: [number, number]
  swap?: [number, number]
  wrongOrder?: [number, number]
}
