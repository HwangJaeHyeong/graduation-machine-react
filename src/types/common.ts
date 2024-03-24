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
