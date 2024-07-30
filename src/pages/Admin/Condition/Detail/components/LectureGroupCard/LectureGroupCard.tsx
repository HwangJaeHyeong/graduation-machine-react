import { Spin } from 'antd'
import { deleteGroups } from 'apis/conditions/deleteGroups'
import { getIdentifications } from 'apis/conditions/getIdentifications'
import { patchGroups } from 'apis/conditions/patchGroups'
import { FC, useEffect, useState } from 'react'
import { LectureIdentificationListType } from 'types/lecture'
import { LectureGroupItemType } from '../../type'
import { LectureIdentificationCard } from '../LectureIdentificationCard'
import {
  CardCollapse,
  CardCollapsePanel,
  CardTitleTypo,
  ContentAddButtonIcon,
  ContentButton,
  ContentContainer,
  ContentDeleteButtonIcon,
  ContentInput,
  ContentIsEssentialCheckbox,
  ContentIsEssentialContainer,
  ContentLectureContainer,
  ContentTitleTypo,
  ContentTypo,
  Root,
} from './styled'

type LectureGroupCardProps = {
  className?: string
  updateLectureGroupList: () => void
  conditionId: number
} & LectureGroupItemType

export const LectureGroupCard: FC<LectureGroupCardProps> = ({
  className,
  id,
  name: defaultName,
  isEssential: defaultIsEssential,
  conditionId,
  updateLectureGroupList,
}) => {
  const [lectureIdentificationList, setLectureIdentificationList] = useState<LectureIdentificationListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [name, setName] = useState<string>(defaultName)
  const [isEssential, setIsEssential] = useState<boolean>(defaultIsEssential)
  const [editable, setEditable] = useState<boolean>(false)

  const updateLectureIdentificationList = () => {
    getIdentifications({ id }).then((res) => {
      setLectureIdentificationList(res.data)
    })
  }

  const onClickDeleteButton = () => {
    if (confirm('정말로 그룹을 삭제하시겠습니까?')) {
      deleteGroups({ conditionId, groupId: id }).then((res) => {
        if (res.success) {
          updateLectureGroupList()
        }
      })
    }
  }

  const onClickEditButton = () => {
    setEditable((prev) => {
      if (prev) {
        patchGroups({ conditionId: conditionId, groupId: id, name, isEssential }).then((res) => {
          if (res.success) {
            updateLectureGroupList()
          }
        })
      }
      return !prev
    })
  }

  useEffect(() => {
    updateLectureIdentificationList()
  }, [])

  return (
    <Root className={className} onClick={() => setIsOpened(true)}>
      <CardCollapse>
        <CardCollapsePanel
          header={<CardTitleTypo>{`${defaultName} ${defaultIsEssential ? '(필수)' : ''}`}</CardTitleTypo>}
          key={`lecture_condition_card_${id}`}
        >
          <ContentContainer>
            <ContentInput
              addonBefore={'그룹명'}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              disabled={!editable}
            />
            <ContentIsEssentialContainer onClick={() => setIsEssential((prev) => !prev)}>
              <ContentIsEssentialCheckbox checked={isEssential} disabled={!editable} />
              <ContentTypo>필수 여부</ContentTypo>
            </ContentIsEssentialContainer>
            <ContentButton type={'primary'} onClick={onClickEditButton}>
              {editable ? '수정 완료' : '그룹 수정'}
            </ContentButton>
            <ContentTitleTypo>선이수 강의</ContentTitleTypo>
            <ContentButton type={'primary'}>
              선이수 강의 추가 <ContentAddButtonIcon />
            </ContentButton>
            <ContentTitleTypo>강의 개설 내역</ContentTitleTypo>
            <ContentLectureContainer>
              {!isOpened && <Spin />}
              {isOpened &&
                lectureIdentificationList.map((lectureIdentificationItem) => (
                  <LectureIdentificationCard
                    {...lectureIdentificationItem}
                    groupId={id}
                    updateLectureIdentificationList={updateLectureIdentificationList}
                    key={`lecture_identification_item_${lectureIdentificationItem.id}`}
                  />
                ))}
            </ContentLectureContainer>
            <ContentButton type={'primary'}>
              강의 추가 <ContentAddButtonIcon />
            </ContentButton>
            <ContentButton danger onClick={onClickDeleteButton}>
              그룹 삭제 <ContentDeleteButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
