export const availableYears = [2020, 2021, 2022, 2023, 2024]
export type AvailableYearType = 2020 | 2021 | 2022 | 2023 | 2024 | 'all'
export type AvailableSeasonType = '1' | 'summer' | '2' | 'winter' | 'all'

export const availableSeason = (year: AvailableYearType): AvailableSeasonType[] => {
  if (year === 2020 || year === 2021 || year === 2022 || year === 2023) {
    return ['1', 'summer', '2', 'winter']
  }
  if (year === 2024) {
    return ['1']
  }
  return []
}
