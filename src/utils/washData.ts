export const washSeason = (season: string) => {
  if (season === '1학기') {
    return '1'
  }
  if (season === '2학기') {
    return '2'
  }
  if (season === '여름학기') {
    return 'summer'
  }
  if (season === '겨울학기') {
    return 'winter'
  }
  return 'common'
}
