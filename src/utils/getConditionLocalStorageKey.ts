import { AvailableYearType } from 'constants/lecture'
import { AvailableMajorType } from 'constants/major'

export const getConditionLocalStorageKey = (major: AvailableMajorType, year: AvailableYearType) => {
  return `condition_${major}_${year}`
}
