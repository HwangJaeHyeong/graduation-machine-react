import { AvailableSeasonType, AvailableYearType } from 'constants/lecture'

export const getTimetableLocalStorageKey = (year: AvailableYearType, season: AvailableSeasonType) => {
  return `comprehensive_timetable_${year}_${season}`
}
