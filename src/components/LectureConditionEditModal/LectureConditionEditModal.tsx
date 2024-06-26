import { DeleteOutlined } from '@ant-design/icons'
import { availableSeason, availableYears, AvailableYearType } from 'constants/lecture'
import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useState } from 'react'
import { LectureIdentificationItemType } from 'types/lecture'
import { ContentButton, ContentButtonContainer, Root, SummaryTypo } from './styled'

type LectureConditionEditModalProps = {
  className?: string
  onDelete: () => void
  lectureIdentificationItem: LectureIdentificationItemType
}

export const LectureConditionEditModal: FC<LectureConditionEditModalProps> = ({
  className,
  onDelete,
  lectureIdentificationItem,
}) => {
  const { state: open, setTrue: openModal, setFalse: closeModal } = useBooleanState({ initialValue: false })
  const [selectedYear, setSelectedYear] = useState<AvailableYearType>()

  const onClickDeleteButton = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      onDelete()
    }
    return
  }

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
      <Root className={className}>
        <SummaryTypo>{`학기 : ${lectureIdentificationItem.year}-${lectureIdentificationItem.season}, 학수번호 : ${lectureIdentificationItem.code}, 강의명 : ${lectureIdentificationItem.name}, 학점 : ${lectureIdentificationItem.credit}`}</SummaryTypo>
        <ContentButtonContainer>
          <ContentButton type="default" shape="circle" icon={<DeleteOutlined />} onClick={onClickDeleteButton} />
        </ContentButtonContainer>
      </Root>
      {/* <ModalRoot title={'과목 정보 수정하기'} open={open} onCancel={closeModal} closable={false} footer={false}>
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
          <ContentSubmitButtonContainer>
            <ModalSubmitButton type={'primary'} onClick={onClickSubmitButton}>
              추가하기
            </ModalSubmitButton>
            <ModalSubmitButton type={'default'} onClick={onCancel}>
              취소하기
            </ModalSubmitButton>
          </ContentSubmitButtonContainer>
        </ModalContentRoot>
      </ModalRoot> */}
    </>
  )
}
