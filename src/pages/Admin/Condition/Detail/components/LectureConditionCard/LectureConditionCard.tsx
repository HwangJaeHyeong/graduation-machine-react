import { getGroups } from 'apis/conditions/getGroups'
import { FC, useEffect, useState } from 'react'
import { LectureConditionItemType, LectureGroupListType } from '../../type'
import { LectureGroupCard } from '../LectureGroupCard'
import {
  CardCollapse,
  CardCollapsePanel,
  CardTitleTypo,
  ContentAddButtonIcon,
  ContentButton,
  ContentContainer,
  ContentInput,
  Root,
} from './styled'

type LectureConditionCardProps = {
  className?: string
} & LectureConditionItemType

export const LectureConditionCard: FC<LectureConditionCardProps> = ({ className, name, minimumCredit, id }) => {
  const [lectureGroupList, setLectureGroupList] = useState<LectureGroupListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)

  useEffect(() => {
    getGroups({ id }).then((res) => {
      setLectureGroupList(res.data)
    })
  }, [])

  return (
    <Root className={className} onClick={() => setIsOpened(true)}>
      <CardCollapse>
        <CardCollapsePanel header={<CardTitleTypo>{name}</CardTitleTypo>} key={`lecture_condition_card_${id}`}>
          <ContentContainer>
            <ContentInput addonBefore={'최소 학점'} value={minimumCredit} />
            {isOpened &&
              lectureGroupList.map((lectureGroupItem) => (
                <LectureGroupCard
                  id={lectureGroupItem.id}
                  name={lectureGroupItem.name}
                  isEssential={lectureGroupItem.isEssential}
                  key={`lecture_group_item_${id}_${lectureGroupItem.id}`}
                />
              ))}
            <ContentButton type={'primary'}>
              그룹 추가 <ContentAddButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
