/**
 * Generate a random integer between 2 integers. If floats are passed instead of integers, the function will round down the min value, and round up the max value.
 * @param min Minimum number (inclusive)
 * @param max Maximum number (exclusive)
 *
 */
export const generateRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generate x amount of numbers between 1 - 99 (represents bar heights)
 * @param amount How many bar heights to generate
 */
export const generateNewBars = (amount: number): number[] => {
  let newBars: number[] = []
  for (let i = 0; i < amount; i++) {
    let randomNumber = generateRandomNumber(1, 100)
    newBars.push(randomNumber)
  }

  return newBars
}
