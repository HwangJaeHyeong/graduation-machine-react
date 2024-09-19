import { ConditionCategoryType, LectureConditionGroupListType } from './lecture'

export type ConditionItemType = {
  id: number
  title: string
  // 최소 이수학점
  minimumCredit: number
  category: ConditionCategoryType
  lectureConditionGroupList: LectureConditionGroupListType
}

export type ConditionListType = ConditionItemType[]

export type FilterOptionType =
  | '강의명 asc'
  | '학기 asc'
  | '연도 asc'
  | '학수번호 asc'
  | '강의명 dsc'
  | '학기 dsc'
  | '연도 dsc'
  | '학수번호 dsc'

export type PreLectureGroupFilterOptionType = '연도 asc' | '연도 dsc' | '이름 asc' | '이름 dsc'
