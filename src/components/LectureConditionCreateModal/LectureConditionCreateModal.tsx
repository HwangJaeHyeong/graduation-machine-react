import { availableSeason, AvailableSeasonType, availableYears, AvailableYearType } from 'constants/lecture'
import { useBooleanState } from 'hooks/useBooleanState'
import { ContentAddButtonIcon } from 'pages/Main/styled'
import { FC, useEffect, useState } from 'react'
import { LectureIdentificationListType } from 'types/lecture'
import { loadTimetableFromLocalStorage } from 'utils/handleTimetableLocalStorage'
import { ContentButton, ModalContentRoot, ModalRoot, ModalSelectField, ModalSubmitButton } from './styled'

type LectureConditionCreateModalProps = {
  className?: string
  onCreate: (year: AvailableYearType, season: AvailableSeasonType, code: string) => void
}

export const LectureConditionCreateModal: FC<LectureConditionCreateModalProps> = ({ className, onCreate }) => {
  const { state: open, setTrue: openModal, setFalse: closeModal } = useBooleanState({ initialValue: false })
  const [availableLectureList, setAvailableLectureList] = useState<LectureIdentificationListType>([])
  const [selectedYear, setSelectedYear] = useState<AvailableYearType>()
  const [selectedSeason, setSelectedSeason] = useState<AvailableSeasonType>()
  const [selectedLectureItemCode, setSelectedLectureItemCode] = useState<string>()

  const onChangeSelectedYear = (value: any) => {
    setSelectedYear(value)
    setSelectedSeason(undefined)
    setSelectedLectureItemCode(undefined)
    return
  }

  const onChangeSelectedSeason = (value: any) => {
    setSelectedSeason(value)
    setSelectedLectureItemCode(undefined)
    return
  }

  const onChangeSelectedLectureItemCode = (value: any) => {
    setSelectedSeason(value)
    return
  }

  const onClickSubmitButton = () => {
    if (!selectedYear || !selectedSeason || !selectedLectureItemCode) {
      alert('선택하지 않은 항목이 있습니다.')
      return
    }
    onCreate(selectedYear, selectedSeason, selectedLectureItemCode)
    return
  }

  const selectAvailableYearOptions = availableYears.map((value) => ({ label: `${value}년도`, value }))
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

  const selectAvailableLectureOptions = (() => {
    if (availableLectureList) {
      return availableLectureList.map((availableLectureItem) => ({
        ...availableLectureList,
        value: availableLectureItem.code,
      }))
    }
    return undefined
  })()

  useEffect(() => {
    if (selectedYear && selectedSeason) {
      const loadedData = loadTimetableFromLocalStorage(selectedYear, selectedSeason)
      if (loadedData) {
        setAvailableLectureList(loadedData)
      }
    }
  }, [selectedYear, selectedSeason, setSelectedYear, setSelectedSeason])

  return (
    <>
      <ContentButton type={'primary'} className={className} onClick={openModal}>
        강의 추가
        <ContentAddButtonIcon />
      </ContentButton>

      <ModalRoot title={'과목 정보 수정하기'} open={open} onCancel={closeModal} closable={true} footer={false}>
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
            options={selectAvailableSeasonOptions ?? []}
            disabled={!selectAvailableSeasonOptions}
            value={selectedSeason}
            onChange={onChangeSelectedSeason}
            showSearch
          />
          <ModalSelectField
            placeholder={'강의를 선택하세요.'}
            options={selectAvailableLectureOptions ?? []}
            disabled={!selectAvailableSeasonOptions}
            value={selectedLectureItemCode}
            onChange={onChangeSelectedLectureItemCode}
            showSearch
          />
          <ModalSubmitButton type={'primary'} onClick={onClickSubmitButton}>
            추가하기
          </ModalSubmitButton>
        </ModalContentRoot>
      </ModalRoot>
    </>
  )
}
