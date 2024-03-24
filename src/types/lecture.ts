import { AvailableSeasonType, AvailableYearType } from 'constants/lecture'

type LectureYearType =
  | 2000
  | 2001
  | 2002
  | 2003
  | 2004
  | 2005
  | 2006
  | 2007
  | 2008
  | 2009
  | 2010
  | 2011
  | 2012
  | 2013
  | 2014
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 2024
  | 2025
  | 2026
  | 2027
  | 2028
  | 2029
  | 2030
  | 2031
  | 2032
  | 2033
  | 2034
  | 2035
  | 2036
  | 2037
  | 2038
  | 2039
  | 2040
  | 2041
  | 2042
  | 2043
  | 2044
  | 2045
  | 2046
  | 2047
  | 2048
  | 2049
  | 2050
  | 2051
  | 2052
  | 2053
  | 2054
  | 2055
  | 2056
  | 2057
  | 2058
  | 2059
  | 2060
  | 2061
  | 2062
  | 2063
  | 2064
  | 2065
  | 2066
  | 2067
  | 2068
  | 2069
  | 2070
  | 2071
  | 2072
  | 2073
  | 2074
  | 2075
  | 2076
  | 2077
  | 2078
  | 2079
  | 2080
type LectureSeasonType = '1학기' | '2학기' | '여름학기' | '겨울학기' | '공통학기'
type LectureGradeType = 'A+' | 'A0' | 'B+' | 'B0' | 'C+' | 'C0' | 'D+' | 'D0' | 'P' | 'F'
type LectureCreditType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type LectureBasicInformationItemType = {
  id: number
  name: string
  year: LectureYearType
  season: AvailableSeasonType
  code: string
}

export type LectureBasicInformationListType = LectureBasicInformationItemType[]

export type LectureIdentificationItemType = {
  id: number
  code: string
  name: string
  year: AvailableYearType
  season: AvailableSeasonType
  credit: LectureCreditType
}

export type LectureIdentificationListType = LectureIdentificationItemType[]

export type LectureConditionGroupItemType = {
  id: number
  title: string
  lectureIdentificationList: LectureIdentificationListType
  isEssential: boolean
}

export type LectureConditionGroupListType = LectureConditionGroupItemType[]

export type LectureDetailsItemType = {
  id: number
  name: string
  credit: LectureCreditType
} & LectureIdentificationItemType

// english : 영어 강의, design : 설계 강의, refinement : 교양 강의, msc
export type ConditionCategoryType = 'english' | 'design' | 'common_refinement' | 'msc' | 'etc'
export type ConditionCategoryItemType = {
  id: number
  label: string
  category: ConditionCategoryType
}

export type ConditionCategoryListType = ConditionCategoryItemType[]
