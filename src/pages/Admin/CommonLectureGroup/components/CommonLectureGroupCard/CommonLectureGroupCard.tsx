import { Spin } from 'antd'
import { getIdentifications } from 'apis/conditions/getIdentifications'
import { FC, useEffect, useState } from 'react'
import { LectureIdentificationListType } from 'types/lecture'
import { CommonLectureGroupItemType } from '../../type'
import { CommonLectureGroupIdentificationCard } from '../CommonLectureGroupIdentificationCard'
import {
  CardCollapse,
  CardCollapsePanel,
  CardTitleTypo,
  ContentButton,
  ContentContainer,
  ContentDeleteButtonIcon,
  ContentInput,
  ContentLectureContainer,
  ContentTitleTypo,
  Root,
} from './styled'

type CommonLectureGroupCardProps = {
  className?: string
  updateCommonLectureGroupList: () => void
} & CommonLectureGroupItemType

export const CommonLectureGroupCard: FC<CommonLectureGroupCardProps> = ({
  className,
  id,
  name: defaultName,
  updateCommonLectureGroupList,
}) => {
  const [lectureIdentificationList, setLectureIdentificationList] = useState<LectureIdentificationListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [name, setName] = useState<string>(defaultName)
  const [editable, setEditable] = useState<boolean>(false)

  const updateLectureIdentificationList = () => {
    getIdentifications({ id }).then((res) => {
      setLectureIdentificationList(res.data)
    })
  }

  const onClickDeleteButton = () => {
    if (confirm('정말로 그룹을 삭제하시겠습니까?')) {
      //
    }
  }

  const onClickEditButton = () => {
    setEditable((prev) => {
      if (prev) {
        //
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
          header={<CardTitleTypo>{`${defaultName}`}</CardTitleTypo>}
          key={`lecture_condition_card_${id}`}
        >
          <ContentContainer>
            <ContentInput
              addonBefore={'그룹명'}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              disabled={!editable}
            />
            <ContentButton type={'primary'} onClick={onClickEditButton}>
              {editable ? '수정 완료' : '그룹 수정'}
            </ContentButton>
            <ContentTitleTypo>강의 개설 내역</ContentTitleTypo>
            <ContentLectureContainer>
              {!isOpened && <Spin />}
              {isOpened &&
                lectureIdentificationList.map((lectureIdentificationItem) => (
                  <CommonLectureGroupIdentificationCard
                    {...lectureIdentificationItem}
                    groupId={id}
                    updateLectureIdentificationList={updateLectureIdentificationList}
                    key={`lecture_identification_item_${lectureIdentificationItem.id}`}
                  />
                ))}
            </ContentLectureContainer>
            <ContentButton danger onClick={onClickDeleteButton}>
              그룹 삭제 <ContentDeleteButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}