export type CommonLectureGroupItemType = {
  id: number
  name: string
}

export type CommonLectureGroupListType = CommonLectureGroupItemType[]

type SeasonType = '1' | '2' | 'winter' | 'summer'

export type CommonLectureGroupIdentificationItemType = {
  id: number
  year: number
  season: SeasonType
  code: string
  name: string
  credit: number
}

export type CommonLectureGroupIdentificationListType = CommonLectureGroupIdentificationItemType[]
