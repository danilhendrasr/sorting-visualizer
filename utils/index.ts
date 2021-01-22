/**
 * Generate a random integer between 2 integers. If floats are passed instead of integers, the function will round down the min value, and round up the max value.
 * @param min Minimum number (inclusive)
 * @param max Maximum number (exclusive)
 * @returns A random number between min and max
 */
export const generateARandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generate x amount of numbers, each is between 1 - 100
 * @param amountOfBar How many bar heights to generate
 * @returns An array of numbers, representing bar heights
 */
export const generateNewBarHeights = (amountOfBar: number): number[] => {
  let newBarHeights: number[] = []
  for (let i = 0; i < amountOfBar; i++) {
    let randomHeight = generateARandomNumber(1, 101)
    newBarHeights.push(randomHeight)
  }

  return newBarHeights
}
