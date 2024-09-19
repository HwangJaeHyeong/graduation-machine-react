export type LectureConditionItemType = {
  id: number
  name: string
  minimumCredit: number
}

export type LectureConditionListType = LectureConditionItemType[]

export type LectureGroupItemType = {
  id: number
  name: string
  isEssential: boolean
}

export type LectureGroupListType = LectureGroupItemType[]

type SeasonType = '1' | '2' | 'winter' | 'summer'

export type LectureIdentificationItemType = {
  id: number
  year: number
  season: SeasonType
  code: string
  name: string
  credit: number
}

export type LectureIdentificationListType = LectureIdentificationItemType[]

export type PreLectureGroupItemType = {
  id: number
  name: string
  year: string
}

export type PreLectureGroupListType = PreLectureGroupItemType[]
