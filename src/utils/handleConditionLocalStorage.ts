import { AvailableYearType } from 'constants/lecture'
import { AvailableMajorType } from 'constants/major'
import { ConditionListType } from 'types/common'
import { getConditionLocalStorageKey } from './getConditionLocalStorageKey'

export const loadConditionFromLocalStorage = (
  major: AvailableMajorType,
  year: AvailableYearType
): ConditionListType => {
  const localStorageValue = localStorage.getItem(getConditionLocalStorageKey(major, year))

  if (localStorageValue) {
    return JSON.parse(localStorageValue) as ConditionListType
  }
  return []
}

export const saveConditionToLocalStorage = (
  major: AvailableMajorType,
  year: AvailableYearType,
  value: ConditionListType
) => {
  localStorage.removeItem(getConditionLocalStorageKey(major, year))
  localStorage.setItem(getConditionLocalStorageKey(major, year), JSON.stringify(value))
  return
}

export const removeConditionToLocalStorage = (major: AvailableMajorType, year: AvailableYearType) => {
  localStorage.removeItem(getConditionLocalStorageKey(major, year))
  return
}
