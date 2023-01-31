export const timeToString = (time: number) => {
  const intTime = Math.floor(time)
  const minute = Math.floor(intTime / 60)
  const second = intTime % 60
  return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}
