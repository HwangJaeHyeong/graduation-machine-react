import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useEffect, useState } from 'react'
import { CommonLectureGroupListType, LectureIdentificationListType } from 'types/lecture'
import { loadCommonLectureGroupFromLocalStorage } from 'utils/handleCommonLectureGroupLocalStorage'
import {
  ContentAddButtonIcon,
  ContentButton,
  ContentSubmitButtonContainer,
  ModalContentRoot,
  ModalRoot,
  ModalSelectField,
  ModalSubmitButton,
  Root,
} from './styled'

type SelectCommonLectureGroupModalProps = {
  className?: string
  onSelect: (value: LectureIdentificationListType) => void
}

export const SelectCommonLectureGroupModal: FC<SelectCommonLectureGroupModalProps> = ({ className, onSelect }) => {
  const { state: open, setTrue: openModal, setFalse: closeModal } = useBooleanState({ initialValue: false })
  const [lectureGroupList, setLectureGroupList] = useState<CommonLectureGroupListType>()
  const [selectedLectureGroupId, setSelectedLectureGroupId] = useState<number>()

  const resetState = () => {
    setSelectedLectureGroupId(undefined)
  }

  const onCancel = () => {
    resetState()
    closeModal()
  }

  const onClickSubmitButton = () => {
    if (!selectedLectureGroupId && selectedLectureGroupId !== 0) {
      alert('공통 그룹을 선택해주세요.')
      return
    }
    const selectedLectureIdentificationList = lectureGroupList?.filter(
      (value) => value.id === selectedLectureGroupId
    )[0].lectureIdentificationList
    if (selectedLectureIdentificationList && selectedLectureIdentificationList.length > 0) {
      onSelect(selectedLectureIdentificationList)
      onCancel()
      return
    }
    alert('올바르지 않은 접근입니다.')
    return
  }

  const onChangeSelectedLectureGroupItem = (id: any) => {
    if (typeof +id === 'number') {
      setSelectedLectureGroupId(+id)
    }
    return
  }

  const selectAvailableYearOptions =
    lectureGroupList && lectureGroupList.map((value) => ({ label: `${value.title}`, value: value.id }))

  useEffect(() => {
    const loadedData = loadCommonLectureGroupFromLocalStorage()
    if (loadedData && loadedData.length > 0) {
      setLectureGroupList(loadedData)
    }
  }, [])

  return (
    <Root className={className}>
      <ContentButton type={'primary'} className={className} onClick={openModal}>
        공통 강의 그룹 선택
        <ContentAddButtonIcon />
      </ContentButton>

      <ModalRoot
        title={'공통 강의 그룹 선택'}
        open={open}
        onCancel={onCancel}
        closable={false}
        maskClosable={false}
        closeIcon={true}
        footer={false}
      >
        <ModalContentRoot>
          <ModalSelectField
            placeholder={'공통 강의 그룹을 선택해주세요.'}
            options={selectAvailableYearOptions}
            value={selectedLectureGroupId}
            onChange={onChangeSelectedLectureGroupItem}
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
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
      </ModalRoot>
    </Root>
  )
}
