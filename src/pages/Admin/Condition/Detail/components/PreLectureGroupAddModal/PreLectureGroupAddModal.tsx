import { message } from 'antd'
import { getCandidatePreGroups } from 'apis/conditions/getCandidatePreGroups'
import { postPreGroups } from 'apis/conditions/postPreGroups'
import { FC, useEffect, useState } from 'react'
import { LectureGroupListType } from '../../type'
import { ContentAddButtonIcon, ContentButton, ContentContainer, ContentModal, ContentSelect, Root } from './styled'

type PreLectureGroupAddModalProps = {
  className?: string
  conditionId: number
  groupId: number
  updatePreGroupList: () => void
}

export const PreLectureGroupAddModal: FC<PreLectureGroupAddModalProps> = ({
  className,
  conditionId,
  groupId,
  updatePreGroupList,
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const [lectureGroupList, setLectureGroupList] = useState<LectureGroupListType>([])
  const [preLectureGroupId, setPreLectureGroupId] = useState<number | undefined>()

  const onClickButton = () => {
    setOpened(true)
  }

  const onCancel = () => {
    setOpened(false)
    setPreLectureGroupId(undefined)
  }

  const onChangeSelect = (value: any) => {
    setPreLectureGroupId(value)
  }

  const onClickSubmitButton = () => {
    if (preLectureGroupId === undefined) {
      message.info('선이수 그룹을 선택해주세요.')
      return
    }
    postPreGroups({ groupId, preGroupId: preLectureGroupId }).then((res) => {
      if (res.success) {
        message.info('선이수 그룹 추가에 성공했습니다.')
        updatePreGroupList()
        onCancel()
      }
      if (res.error) {
        message.error('선이수 그룹 추가에 실패했습니다.')
        onCancel()
      }
    })
  }

  const washedLectureGroupOptionList = lectureGroupList.map((value) => ({
    label: `${value.name}`,
    value: value.id,
  }))

  useEffect(() => {
    getCandidatePreGroups({ conditionId, groupId }).then((res) => {
      if (res.success) {
        setLectureGroupList(res.data)
      }
    })
  }, [])

  return (
    <Root className={className}>
      <ContentButton onClick={onClickButton} type={'primary'}>
        선이수 강의 추가
        <ContentAddButtonIcon />
      </ContentButton>
      <ContentModal open={opened} onCancel={onCancel} footer={null} title={'선이수 강의 추가'}>
        <ContentContainer>
          <ContentSelect
            placeholder={'선이수 강의를 추가해주세요.'}
            onChange={onChangeSelect}
            value={preLectureGroupId}
            options={washedLectureGroupOptionList}
          />
          <ContentButton onClick={onClickSubmitButton} type={'primary'}>
            완료
          </ContentButton>
        </ContentContainer>
      </ContentModal>
    </Root>
  )
}
