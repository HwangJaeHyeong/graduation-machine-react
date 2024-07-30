import { deleteConditions } from 'apis/conditions/deleteConditions'
import { getGroups } from 'apis/conditions/getGroups'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LectureConditionItemType, LectureGroupListType } from '../../type'
import { LectureGroupCard } from '../LectureGroupCard'
import {
  CardCollapse,
  CardCollapsePanel,
  CardTitleTypo,
  ContentAddButtonIcon,
  ContentButton,
  ContentContainer,
  ContentDeleteButtonIcon,
  ContentInput,
  Root,
} from './styled'

type LectureConditionCardProps = {
  className?: string
  updateLectureConditionList: () => void
} & LectureConditionItemType

export const LectureConditionCard: FC<LectureConditionCardProps> = ({
  className,
  name,
  minimumCredit,
  id,
  updateLectureConditionList,
}) => {
  const { id: graduationId } = useParams()
  const [lectureGroupList, setLectureGroupList] = useState<LectureGroupListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const updateLectureGroupList = () => {
    getGroups({ id }).then((res) => {
      setLectureGroupList(res.data)
    })
  }

  const onClickDeleteConditionButton = () => {
    if (graduationId && typeof +graduationId === 'number') {
      if (confirm('정말로 조건을 삭제하시겠습니까?')) {
        deleteConditions({ graduationId: +graduationId, conditionId: id }).then((res) => {
          if (res.success) {
            updateLectureConditionList()
          }
        })
      }
    }
  }

  useEffect(() => {
    updateLectureGroupList()
  }, [])

  return (
    <Root className={className} onClick={() => setIsOpened(true)}>
      <CardCollapse>
        <CardCollapsePanel
          header={<CardTitleTypo>{`${name} (최소 ${minimumCredit}학점)`}</CardTitleTypo>}
          key={`lecture_condition_card_${id}`}
        >
          <ContentContainer>
            <ContentInput addonBefore={'최소 학점'} value={minimumCredit} />
            {isOpened &&
              lectureGroupList.map((lectureGroupItem) => (
                <LectureGroupCard
                  id={lectureGroupItem.id}
                  name={lectureGroupItem.name}
                  isEssential={lectureGroupItem.isEssential}
                  updateLectureGroupList={updateLectureGroupList}
                  key={`lecture_group_item_${id}_${lectureGroupItem.id}`}
                />
              ))}
            <ContentButton type={'primary'}>
              그룹 추가 <ContentAddButtonIcon />
            </ContentButton>
            <ContentButton type={'default'} onClick={onClickDeleteConditionButton} danger>
              조건 삭제 <ContentDeleteButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
