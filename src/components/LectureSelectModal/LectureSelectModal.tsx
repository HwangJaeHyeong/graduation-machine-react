import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { availableSeason, availableYears, AvailableYearType } from 'constants/lecture'
import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useState } from 'react'
import {
  ContentButton,
  ContentButtonContainer,
  ModalContentRoot,
  ModalRoot,
  ModalSelectField,
  ModalSubmitButton,
  Root,
  SummaryTypo,
} from './styled'

type LectureSelectModalProps = {
  className?: string
  onDelete: () => void
}

export const LectureSelectModal: FC<LectureSelectModalProps> = ({ className, onDelete }) => {
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
        <SummaryTypo>EAS1</SummaryTypo>
        <ContentButtonContainer>
          <ContentButton type="default" shape="circle" icon={<EditOutlined />} onClick={openModal} />
          <ContentButton type="default" shape="circle" icon={<DeleteOutlined />} onClick={onClickDeleteButton} />
        </ContentButtonContainer>
      </Root>
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
          <ModalSubmitButton type={'primary'} onClick={onClickSubmitButton}>
            수정하기
          </ModalSubmitButton>
        </ModalContentRoot>
      </ModalRoot>
    </>
  )
}
