export type ResultLectureIdentificationItemType = {
  code: string
  credit: number
  grade: string
  id: number
  name: string
  season: '1' | '2' | 'winter' | 'summer'
  year: number
}

export type ResultLectureIdentificationListType = ResultLectureIdentificationItemType[]

export type ResultPreLectureGroupItemType = {
  id: number
  name: string
  status: boolean
}

export type ResultPreLectureGroupListType = ResultPreLectureGroupItemType[]

export type ResultLectureGroupItemType = {
  id: number
  year: number
  season: '1' | '2' | 'winter' | 'summer'
  isEssential: boolean
  isPassed: boolean
  lectureIdentificationItem: ResultLectureIdentificationItemType
  multiLectureIdentificationItem: ResultLectureIdentificationListType
  isMultiGroup: boolean
  maximumNumber: number
  minimumNumber: number
  name: string
  preLectureGroupList: ResultPreLectureGroupListType
}

export type ResultLectureGroupListType = ResultLectureGroupItemType[]

export type ResultLectureConditionItemType = {
  id: number
  isPassed: boolean
  lectureGroupList: ResultLectureGroupListType
  minimumCredit: number
  name: string
  passedCredit: number
}

export type ResultLectureConditionListType = ResultLectureConditionItemType[]
