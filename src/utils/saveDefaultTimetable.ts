import {
  DEFAULT_TIMETABLE_2020_1,
  DEFAULT_TIMETABLE_2020_2,
  DEFAULT_TIMETABLE_2020_SUMMER,
  DEFAULT_TIMETABLE_2020_WINTER,
  DEFAULT_TIMETABLE_2021_1,
  DEFAULT_TIMETABLE_2021_2,
  DEFAULT_TIMETABLE_2021_SUMMER,
  DEFAULT_TIMETABLE_2021_WINTER,
  DEFAULT_TIMETABLE_2022_1,
  DEFAULT_TIMETABLE_2022_2,
  DEFAULT_TIMETABLE_2022_SUMMER,
  DEFAULT_TIMETABLE_2022_WINTER,
  DEFAULT_TIMETABLE_2023_1,
  DEFAULT_TIMETABLE_2023_2,
  DEFAULT_TIMETABLE_2023_SUMMER,
  DEFAULT_TIMETABLE_2023_WINTER,
  DEFAULT_TIMETABLE_2024_1,
} from 'constants/timetable'
import { LOCALSTORAGE_TIMETABLE_VERSION_KEY, TIMETABLE_VERSION } from 'constants/version'
import { LectureIdentificationListType } from 'types/lecture'
import { saveTimetableToLocalStorage } from './handleTimetableLocalStorage'

const addTimetableToId = (value: any[]): LectureIdentificationListType =>
  value.map((value2, index) => ({ ...value2, id: index }))

export const saveDefaultTimetable = () => {
  if (localStorage.getItem(LOCALSTORAGE_TIMETABLE_VERSION_KEY) === TIMETABLE_VERSION) {
    return
  }

  saveTimetableToLocalStorage(2020, '1', addTimetableToId(DEFAULT_TIMETABLE_2020_1))
  saveTimetableToLocalStorage(2020, 'summer', addTimetableToId(DEFAULT_TIMETABLE_2020_SUMMER))
  saveTimetableToLocalStorage(2020, '2', addTimetableToId(DEFAULT_TIMETABLE_2020_2))
  saveTimetableToLocalStorage(2020, 'winter', addTimetableToId(DEFAULT_TIMETABLE_2020_WINTER))

  saveTimetableToLocalStorage(2021, '1', addTimetableToId(DEFAULT_TIMETABLE_2021_1))
  saveTimetableToLocalStorage(2021, 'summer', addTimetableToId(DEFAULT_TIMETABLE_2021_SUMMER))
  saveTimetableToLocalStorage(2021, '2', addTimetableToId(DEFAULT_TIMETABLE_2021_2))
  saveTimetableToLocalStorage(2021, 'winter', addTimetableToId(DEFAULT_TIMETABLE_2021_WINTER))

  saveTimetableToLocalStorage(2022, '1', addTimetableToId(DEFAULT_TIMETABLE_2022_1))
  saveTimetableToLocalStorage(2022, 'summer', addTimetableToId(DEFAULT_TIMETABLE_2022_SUMMER))
  saveTimetableToLocalStorage(2022, '2', addTimetableToId(DEFAULT_TIMETABLE_2022_2))
  saveTimetableToLocalStorage(2022, 'winter', addTimetableToId(DEFAULT_TIMETABLE_2022_WINTER))

  saveTimetableToLocalStorage(2023, '1', addTimetableToId(DEFAULT_TIMETABLE_2023_1))
  saveTimetableToLocalStorage(2023, 'summer', addTimetableToId(DEFAULT_TIMETABLE_2023_SUMMER))
  saveTimetableToLocalStorage(2023, '2', addTimetableToId(DEFAULT_TIMETABLE_2023_2))
  saveTimetableToLocalStorage(2023, 'winter', addTimetableToId(DEFAULT_TIMETABLE_2023_WINTER))

  saveTimetableToLocalStorage(2024, '1', addTimetableToId(DEFAULT_TIMETABLE_2024_1))

  localStorage.removeItem(LOCALSTORAGE_TIMETABLE_VERSION_KEY)
  localStorage.setItem(LOCALSTORAGE_TIMETABLE_VERSION_KEY, TIMETABLE_VERSION)
}
