import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useState } from 'react'
import { ConditionListType } from 'types/common'
import { PreLectureItemType } from 'types/lecture'
import {
  ContentAddButtonIcon,
  ContentButton,
  ContentSubmitButtonContainer,
  ModalContentRoot,
  ModalRoot,
  ModalSelectField,
  ModalSubmitButton,
} from './styled'

type SelectPreLectureModalProps = {
  className?: string
  conditionList: ConditionListType
  conditionId: number
  groupId: number
  onCreate: (_preLectureItem: PreLectureItemType) => void
}

export const SelectPreLectureModal: FC<SelectPreLectureModalProps> = ({
  className,
  conditionId,
  groupId,
  conditionList,
  onCreate,
}) => {
  const { state: open, setTrue: openModal, setFalse: closeModal } = useBooleanState({ initialValue: false })
  const [selectedLectureGroup, setSelectedLectureGroup] = useState<string>()

  const LECTURE_CONDITION_GROUP_LIST = (() => {
    let newValue: any[] = []
    conditionList.forEach((conditionItem) => {
      conditionItem.lectureConditionGroupList.forEach((groupItem) => {
        if (!(conditionItem.id === conditionId && groupItem.id === groupId))
          newValue.push({
            conditionId: conditionItem.id,
            groupId: groupItem.id,
            title: groupItem.title,
            lectureIdentificationList: groupItem.lectureIdentificationList,
          })
      })
    })
    return newValue
  })()

  const onCancel = () => {
    closeModal()
    resetModal()
    return
  }

  const resetModal = () => {
    setSelectedLectureGroup(undefined)
  }

  const onClickSubmitButton = () => {
    if (!selectedLectureGroup) {
      alert('강의 그룹을 선택해주세요.')
      return
    }
    onCreate(JSON.parse(selectedLectureGroup) as PreLectureItemType)
    onCancel()
    return
  }

  const selectAvailableLectureGroupOptions = [
    ...LECTURE_CONDITION_GROUP_LIST.map((value) => ({
      label: `${value.title} (groupId: ${value.groupId}, conditionId: ${value.conditionId})`,
      value: `{"groupId": ${value.groupId}, "conditionId": ${value.conditionId}}`,
    })),
  ]

  const onChangeSelectedLectureGroup = (value: any) => {
    setSelectedLectureGroup(value)
    return
  }

  return (
    <>
      <ContentButton type={'primary'} className={className} onClick={openModal}>
        선이수 강의 추가
        <ContentAddButtonIcon />
      </ContentButton>
      <ModalRoot
        title={'선이수 강의 추가'}
        open={open}
        onCancel={onCancel}
        closable={false}
        maskClosable={false}
        closeIcon={true}
        footer={false}
      >
        <ModalContentRoot>
          <ModalSelectField
            placeholder={'강의 그룹을 선택하세요'}
            options={selectAvailableLectureGroupOptions}
            value={selectedLectureGroup}
            onChange={onChangeSelectedLectureGroup}
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
    </>
  )
}
