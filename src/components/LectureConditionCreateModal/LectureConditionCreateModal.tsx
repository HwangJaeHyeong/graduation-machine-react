import { availableSeason, availableYears, AvailableYearType } from 'constants/lecture'
import { useBooleanState } from 'hooks/useBooleanState'
import { ContentAddButtonIcon } from 'pages/Main/styled'
import { FC, useState } from 'react'
import {
  ContentButton,
  ContentCheckbox,
  ContentTypo,
  ModalContentRoot,
  ModalContentRowContainer,
  ModalRoot,
  ModalSelectField,
  ModalSubmitButton,
} from './styled'

type LectureConditionCreateModalProps = {
  className?: string
}

export const LectureConditionCreateModal: FC<LectureConditionCreateModalProps> = ({ className }) => {
  const { state: open, setTrue: openModal, setFalse: closeModal } = useBooleanState({ initialValue: false })
  const [selectedYear, setSelectedYear] = useState<AvailableYearType>()
  const { state: isEssentialLecture, setToggle: toggleIsEssentialLecture } = useBooleanState({ initialValue: false })

  const onChangeSelectedYear = (value: any) => {
    setSelectedYear(value)
    return
  }

  const onClickSubmitButton = () => {
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
            onChange={onChangeSelectedYear}
            showSearch
          />
          <ModalSelectField
            placeholder={'학기를 선택하세요.'}
            options={selectAvailableSeasonOptions ?? []}
            disabled={!selectAvailableSeasonOptions}
            showSearch
          />
          <ModalContentRowContainer onClick={toggleIsEssentialLecture}>
            <ContentCheckbox type={'checkbox'} checked={isEssentialLecture} />
            <ContentTypo>필수</ContentTypo>
          </ModalContentRowContainer>
          <ModalSubmitButton type={'primary'} onClick={onClickSubmitButton}>
            추가하기
          </ModalSubmitButton>
        </ModalContentRoot>
      </ModalRoot>
    </>
  )
}
