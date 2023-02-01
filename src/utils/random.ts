export function shuffleArray<T>(arr: T[]) {
  const array = [...arr]

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[j]
    array[j] = array[i]
    array[i] = temp
  }

  return array
}
