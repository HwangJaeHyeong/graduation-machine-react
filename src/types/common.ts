import { LectureIdentificationListType } from './lecture'

export type ConditionItemType = {
  id: number
  title: string
  lectureIdentificationList: LectureIdentificationListType
}

export type ConditionListType = ConditionItemType[]
