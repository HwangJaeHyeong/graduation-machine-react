import { deleteConditions } from 'apis/conditions/deleteConditions'
import { getGroups } from 'apis/conditions/getGroups'
import { patchConditions } from 'apis/conditions/patchConditions'
import { postGroups } from 'apis/conditions/postGroups'
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
  name: defaultName,
  minimumCredit: defaultMinimumCredit,
  id,
  updateLectureConditionList,
}) => {
  const { id: graduationId } = useParams()
  const [lectureGroupList, setLectureGroupList] = useState<LectureGroupListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [editable, setEditable] = useState<boolean>(false)
  const [name, setName] = useState<string>(defaultName)
  const [minimumCredit, setMinimumCredit] = useState<number>(defaultMinimumCredit)

  const updateLectureGroupList = () => {
    getGroups({ id }).then((res) => {
      setLectureGroupList(res.data)
    })
  }

  const onClickAddButton = () => {
    postGroups({ conditionId: id, name: '새로운 그룹', isEssential: false }).then((res) => {
      updateLectureGroupList()
    })
  }

  const onClickDeleteButton = () => {
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

  const onClickEditButton = () => {
    setEditable((prev) => {
      if (prev) {
        if (graduationId && typeof +graduationId === 'number') {
          patchConditions({ graduationId: +graduationId, conditionId: id, name, minimumCredit }).then((res) => {
            if (res.success) {
              updateLectureConditionList()
            }
          })
        }
      }
      return !prev
    })
  }

  useEffect(() => {
    updateLectureGroupList()
  }, [])

  return (
    <Root className={className} onClick={() => setIsOpened(true)}>
      <CardCollapse>
        <CardCollapsePanel
          header={<CardTitleTypo>{`${defaultName} (최소 ${defaultMinimumCredit}학점)`}</CardTitleTypo>}
          key={`lecture_condition_card_${id}`}
        >
          <ContentContainer>
            <ContentInput
              addonBefore={'조건명'}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              disabled={!editable}
            />
            <ContentInput
              addonBefore={'최소 학점'}
              type={'number'}
              value={minimumCredit}
              onChange={(e: any) => setMinimumCredit(e.target.value)}
              disabled={!editable}
            />
            <ContentButton type={'primary'} onClick={onClickEditButton}>
              {editable ? '수정 완료' : '조건 수정'}
            </ContentButton>
            {isOpened &&
              lectureGroupList.map((lectureGroupItem) => (
                <LectureGroupCard
                  id={lectureGroupItem.id}
                  name={lectureGroupItem.name}
                  isEssential={lectureGroupItem.isEssential}
                  isMultiLecture={lectureGroupItem.isMultiLecture}
                  maximumNumber={lectureGroupItem.maximumNumber}
                  minimumNumber={lectureGroupItem.minimumNumber}
                  updateLectureGroupList={updateLectureGroupList}
                  conditionId={id}
                  key={`lecture_group_item_${id}_${lectureGroupItem.id}`}
                />
              ))}
            <ContentButton type={'primary'} onClick={onClickAddButton}>
              그룹 추가 <ContentAddButtonIcon />
            </ContentButton>
            <ContentButton type={'default'} onClick={onClickDeleteButton} danger>
              조건 삭제 <ContentDeleteButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
