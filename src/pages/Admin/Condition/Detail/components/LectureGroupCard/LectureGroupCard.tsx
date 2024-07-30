import { Spin } from 'antd'
import { deleteGroups } from 'apis/conditions/deleteGroups'
import { getIdentifications } from 'apis/conditions/getIdentifications'
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
  ContentLectureContainer,
  ContentTitleTypo,
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
  name,
  isEssential,
  conditionId,
  updateLectureGroupList,
}) => {
  const [lectureIdentificationList, setLectureIdentificationList] = useState<LectureIdentificationListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)

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

  useEffect(() => {
    updateLectureIdentificationList()
  }, [])

  return (
    <Root className={className} onClick={() => setIsOpened(true)}>
      <CardCollapse>
        <CardCollapsePanel
          header={<CardTitleTypo>{`${name} ${isEssential ? '(필수)' : ''}`}</CardTitleTypo>}
          key={`lecture_condition_card_${id}`}
        >
          <ContentContainer>
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
