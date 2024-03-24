import { AvailableYearType } from 'constants/lecture'
import { AvailableMajorType } from 'constants/major'
import { LectureIdentificationListType } from 'types/lecture'
import { getConditionLocalStorageKey } from './getConditionLocalStorageKey'

export const loadConditionFromLocalStorage = (
  major: AvailableMajorType,
  year: AvailableYearType
): LectureIdentificationListType => {
  const localStorageValue = localStorage.getItem(getConditionLocalStorageKey(major, year))

  if (localStorageValue) {
    return JSON.parse(localStorageValue) as LectureIdentificationListType
  }
  return []
}

export const saveConditionToLocalStorage = (
  major: AvailableMajorType,
  year: AvailableYearType,
  value: LectureIdentificationListType
) => {
  localStorage.removeItem(getConditionLocalStorageKey(major, year))
  localStorage.setItem(getConditionLocalStorageKey(major, year), JSON.stringify(value))
  return
}

export const removeConditionToLocalStorage = (major: AvailableMajorType, year: AvailableYearType) => {
  localStorage.removeItem(getConditionLocalStorageKey(major, year))
  return
}
