import { AvailableSeasonType, AvailableYearType } from 'constants/lecture'
import { LectureIdentificationListType } from 'types/lecture'
import { getTimetableLocalStorageKey } from 'utils/getTimetableLocalStorageKey'

export const loadTimetableFromLocalStorage = (
  year: AvailableYearType,
  season: AvailableSeasonType
): LectureIdentificationListType => {
  const localStorageValue = localStorage.getItem(getTimetableLocalStorageKey(year, season))

  if (localStorageValue) {
    return JSON.parse(localStorageValue) as LectureIdentificationListType
  }
  return []
}

export const saveTimetableToLocalStorage = (
  year: AvailableYearType,
  season: AvailableSeasonType,
  value: LectureIdentificationListType
) => {
  localStorage.removeItem(getTimetableLocalStorageKey(year, season))
  localStorage.setItem(getTimetableLocalStorageKey(year, season), JSON.stringify(value))
  return
}

export const removeTimetableToLocalStorage = (year: AvailableYearType, season: AvailableSeasonType) => {
  localStorage.removeItem(getTimetableLocalStorageKey(year, season))
  return
}
