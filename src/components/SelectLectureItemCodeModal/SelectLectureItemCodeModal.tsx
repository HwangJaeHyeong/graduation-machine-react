import { availableSeason, AvailableSeasonType, availableYears, AvailableYearType } from 'constants/lecture'
import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useEffect, useState } from 'react'
import { LectureIdentificationListType } from 'types/lecture'
import { loadTimetableFromLocalStorage } from 'utils/handleTimetableLocalStorage'
import {
  ContentAddButtonIcon,
  ContentButton,
  ContentSubmitButtonContainer,
  ModalContentRoot,
  ModalInput,
  ModalRoot,
  ModalSelectField,
  ModalSubmitButton,
} from './styled'

type SelectLectureItemCodeModalProps = {
  className?: string
  onCreate: (lectureIdentificationList: LectureIdentificationListType) => () => void
}

export const SelectLectureItemCodeModal: FC<SelectLectureItemCodeModalProps> = ({ className, onCreate }) => {
  const { state: open, setTrue: openModal, setFalse: closeModal } = useBooleanState({ initialValue: false })
  const [availableLectureList, setAvailableLectureList] = useState<LectureIdentificationListType>([])
  const [selectedYear, setSelectedYear] = useState<AvailableYearType | 'all'>()
  const [selectedSeason, setSelectedSeason] = useState<AvailableSeasonType | 'all'>()
  const [name, setName] = useState<string>('')

  const resetState = () => {
    setSelectedYear(undefined)
    setSelectedSeason(undefined)
    setAvailableLectureList([])
    setName('')
  }

  const onChangeSelectedYear = (value: any) => {
    setSelectedYear(value)
    setSelectedSeason(undefined)
    setAvailableLectureList([])
    setName('')
    return
  }

  const onChangeSelectedSeason = (value: any) => {
    setSelectedSeason(value)
    setName('')
    return
  }

  const onClickSubmitButton = () => {
    if (!selectedYear || !selectedSeason) {
      alert('선택하지 않은 항목이 있습니다.')
      return
    }
    let newLectureList = availableLectureList.filter((value) => value.code.indexOf(name) !== -1)
    onCreate(newLectureList)()
    closeModal()
    resetState()
    return
  }

  const selectAvailableYearOptions = [
    ...availableYears.map((value) => ({ label: `${value}년도`, value })),
    { label: '전체', value: 'all' },
  ]

  const selectAvailableSeasonOptions = (() => {
    if (selectedYear) {
      return availableSeason(selectedYear).map((value) => {
        if (value === '1') {
          return { label: '1학기', value }
        }
        if (value === '2') {
          return { label: '2학기', value }
        }
        if (value === 'summer') {
          return { label: '여름학기', value }
        }
        return { label: '겨울학기', value }
      })
    }
    return undefined
  })()

  const onCancel = () => {
    resetState()
    closeModal()
  }

  useEffect(() => {
    if (selectedYear && selectedSeason) {
      let loadedData = []
      if (selectedYear === 'all') {
        loadedData = [
          ...loadTimetableFromLocalStorage(2020, '1'),
          ...loadTimetableFromLocalStorage(2020, '2'),
          ...loadTimetableFromLocalStorage(2020, 'winter'),
          ...loadTimetableFromLocalStorage(2020, 'summer'),

          ...loadTimetableFromLocalStorage(2021, '1'),
          ...loadTimetableFromLocalStorage(2021, '2'),
          ...loadTimetableFromLocalStorage(2021, 'winter'),
          ...loadTimetableFromLocalStorage(2021, 'summer'),

          ...loadTimetableFromLocalStorage(2022, '1'),
          ...loadTimetableFromLocalStorage(2022, '2'),
          ...loadTimetableFromLocalStorage(2022, 'winter'),
          ...loadTimetableFromLocalStorage(2022, 'summer'),

          ...loadTimetableFromLocalStorage(2023, '1'),
          ...loadTimetableFromLocalStorage(2023, '2'),
          ...loadTimetableFromLocalStorage(2023, 'winter'),
          ...loadTimetableFromLocalStorage(2023, 'summer'),

          ...loadTimetableFromLocalStorage(2024, '1'),
        ]
      } else if (selectedSeason === 'all') {
        loadedData = [
          ...loadTimetableFromLocalStorage(selectedYear, '1'),
          ...loadTimetableFromLocalStorage(selectedYear, '2'),
          ...loadTimetableFromLocalStorage(selectedYear, 'winter'),
          ...loadTimetableFromLocalStorage(selectedYear, 'summer'),
        ]
      } else {
        loadedData = loadTimetableFromLocalStorage(selectedYear, selectedSeason)
      }
      if (loadedData) {
        setAvailableLectureList(loadedData)
      }
    }
  }, [selectedYear, selectedSeason, setSelectedYear, setSelectedSeason])

  return (
    <>
      <ContentButton type={'primary'} className={className} onClick={openModal}>
        학수 번호로 강의 추가
        <ContentAddButtonIcon />
      </ContentButton>

      <ModalRoot
        title={'과목 정보 수정하기'}
        open={open}
        onCancel={onCancel}
        closable={false}
        maskClosable={false}
        closeIcon={true}
        footer={false}
      >
        <ModalContentRoot>
          <ModalSelectField
            placeholder={'년도를 선택하세요.'}
            options={selectAvailableYearOptions}
            value={selectedYear}
            onChange={onChangeSelectedYear}
            showSearch
          />
          <ModalSelectField
            placeholder={'학기를 선택하세요.'}
            options={selectAvailableSeasonOptions?.concat({ label: '전체', value: 'all' }) ?? []}
            disabled={!selectAvailableSeasonOptions}
            value={selectedSeason}
            onChange={onChangeSelectedSeason}
            showSearch
          />
          <ModalInput
            placeholder="학수 번호를 입력하세요."
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            disabled={!selectedSeason}
          />
          <ContentSubmitButtonContainer>
            <ModalSubmitButton type={'primary'} onClick={onClickSubmitButton}>
              추가하기
            </ModalSubmitButton>
            <ModalSubmitButton type={'default'} onClick={onCancel}>
              취소하기
            </ModalSubmitButton>
          </ContentSubmitButtonContainer>
        </ModalContentRoot>
      </ModalRoot>
    </>
  )
}
