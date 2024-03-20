import { ConditionCategoryType, LectureConditionListType } from './lecture'

export type ConditionItemType = {
  id: number
  title: string
  category: ConditionCategoryType
  lectureIdentificationList: LectureConditionListType
  memo?: string
}

export type ConditionListType = ConditionItemType[]
