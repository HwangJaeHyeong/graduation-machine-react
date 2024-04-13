import { AvailableYearType } from 'constants/lecture'
import { AvailableMajorType } from 'constants/major'
import { CommonLectureGroupListType } from 'types/lecture'

const COMMON_LECTURE_GROUP_KEY = 'local-common-lecture-group'

export const loadCommonLectureGroupFromLocalStorage = (): CommonLectureGroupListType => {
  const localStorageValue = localStorage.getItem(COMMON_LECTURE_GROUP_KEY)

  if (localStorageValue) {
    return JSON.parse(localStorageValue) as CommonLectureGroupListType
  }
  return []
}

export const saveCommonLectureGroupToLocalStorage = (value: CommonLectureGroupListType) => {
  localStorage.removeItem(COMMON_LECTURE_GROUP_KEY)
  localStorage.setItem(COMMON_LECTURE_GROUP_KEY, JSON.stringify(value))
  return
}

export const removeCommonLectureGroupToLocalStorage = (major: AvailableMajorType, year: AvailableYearType) => {
  localStorage.removeItem(COMMON_LECTURE_GROUP_KEY)
  return
}
