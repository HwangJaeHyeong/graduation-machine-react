import { Spin } from 'antd'
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
  ContentLectureList,
  ContentTitleTypo,
  Root,
} from './styled'

type LectureGroupCardProps = {
  className?: string
} & LectureGroupItemType

export const LectureGroupCard: FC<LectureGroupCardProps> = ({ className, id, name, isEssential }) => {
  const [lectureIdentificationList, setLectureIdentificationList] = useState<LectureIdentificationListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)

  useEffect(() => {
    getIdentifications({ id }).then((data) => {
      setLectureIdentificationList(data)
    })
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
            <ContentLectureList>
              {!isOpened && <Spin />}
              {isOpened &&
                lectureIdentificationList.map((lectureIdentificationItem) => (
                  <LectureIdentificationCard
                    {...lectureIdentificationItem}
                    key={`lecture_identification_item_${lectureIdentificationItem.id}`}
                  />
                ))}
            </ContentLectureList>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
