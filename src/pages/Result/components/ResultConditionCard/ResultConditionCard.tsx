import { ResultLectureConditionItemType, ResultLectureGroupListType } from 'pages/Result/type'
import { FC } from 'react'
import { ResultGroupCard } from '../ResultGroupCard'
import {
  CardCollapse,
  CardCollapsePanel,
  CardContainer,
  CardTitleTypo,
  ContentContainer,
  ContentTypo,
  Root,
  RootCardCollapse,
} from './styled'

type ResultConditionCardProps = {
  className?: string
} & ResultLectureConditionItemType

export const ResultConditionCard: FC<ResultConditionCardProps> = ({
  className,
  id,
  name,
  minimumCredit,
  passedCredit,
  isPassed,
  lectureGroupList,
}) => {
  const washedLectureGroupList = (() => {
    const newLectureGroupList: {
      필수미수강: ResultLectureGroupListType
      단순미수강: ResultLectureGroupListType
      수강: ResultLectureGroupListType
    } = {
      필수미수강: [],
      단순미수강: [],
      수강: [],
    }
    lectureGroupList.forEach((lectureGroupItem) => {
      if (lectureGroupItem.lectureIdentificationItem?.id) {
        newLectureGroupList.수강.push(lectureGroupItem)
      } else if (lectureGroupItem.isEssential) {
        newLectureGroupList.필수미수강.push(lectureGroupItem)
      } else {
        newLectureGroupList.단순미수강.push(lectureGroupItem)
      }
    })
    return newLectureGroupList
  })()

  return (
    <Root className={className}>
      <RootCardCollapse isPassed={isPassed}>
        <CardCollapsePanel header={<CardTitleTypo>{`${name}`}</CardTitleTypo>} key={`lecture_condition_card_${id}`}>
          <ContentContainer>
            {washedLectureGroupList.수강.length > 0 && (
              <CardCollapse>
                <CardCollapsePanel
                  header={<CardTitleTypo>{`수강 과목`}</CardTitleTypo>}
                  key={`lecture_condition_card_${id}`}
                >
                  <CardContainer>
                    {washedLectureGroupList.수강.map((lectureGroupItem) => (
                      <ResultGroupCard {...lectureGroupItem} key={`lecture_group_item_${lectureGroupItem.id}`} />
                    ))}
                  </CardContainer>
                </CardCollapsePanel>
              </CardCollapse>
            )}
            {washedLectureGroupList.필수미수강.length > 0 && (
              <CardCollapse>
                <CardCollapsePanel
                  header={<CardTitleTypo>{`필수 미수강 과목`}</CardTitleTypo>}
                  key={`lecture_condition_card_${id}`}
                >
                  <CardContainer>
                    {washedLectureGroupList.필수미수강.map((lectureGroupItem) => (
                      <ResultGroupCard {...lectureGroupItem} key={`lecture_group_item_${lectureGroupItem.id}`} />
                    ))}
                  </CardContainer>
                </CardCollapsePanel>
              </CardCollapse>
            )}
            {washedLectureGroupList.단순미수강.length > 0 && (
              <CardCollapse>
                <CardCollapsePanel
                  header={<CardTitleTypo>{`단순 미수강 과목`}</CardTitleTypo>}
                  key={`lecture_condition_card_${id}`}
                >
                  <CardContainer>
                    {washedLectureGroupList.단순미수강.map((lectureGroupItem) => (
                      <ResultGroupCard {...lectureGroupItem} key={`lecture_group_item_${lectureGroupItem.id}`} />
                    ))}
                  </CardContainer>
                </CardCollapsePanel>
              </CardCollapse>
            )}
            <ContentTypo>이수 학점/최소 학점 : {`${passedCredit}/${minimumCredit}`}</ContentTypo>
            <ContentTypo>통과 여부 : {isPassed ? 'P' : 'F'}</ContentTypo>
          </ContentContainer>
        </CardCollapsePanel>
      </RootCardCollapse>
    </Root>
  )
}
