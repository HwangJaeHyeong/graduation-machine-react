import { AvailableSeasonType } from 'constants/lecture'
import { LectureIdentificationItemType } from 'types/lecture'

const rankSeason = (season: AvailableSeasonType): number => {
  if (season === '1') {
    return 1
  }
  if (season === 'summer') {
    return 2
  }
  if (season === '2') {
    return 3
  }
  if (season === 'winter') {
    return 4
  }
  return 0
}

// lectureItem1가 lectureItem2보다 먼저 -> return true, 그 외 -> return false
export const compareLectureYearAndSeason = (
  lectureItem1: LectureIdentificationItemType,
  lectureItem2: LectureIdentificationItemType
) => {
  if (lectureItem1.year < lectureItem2.year) {
    return true
  }
  if (lectureItem1.year > lectureItem2.year) {
    return false
  }

  return rankSeason(lectureItem1.season) < rankSeason(lectureItem2.season)
}
