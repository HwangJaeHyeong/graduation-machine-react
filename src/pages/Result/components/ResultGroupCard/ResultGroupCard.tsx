import { ResultLectureGroupItemType } from 'pages/Result/type'
import { FC } from 'react'
import { CardCollapse, CardCollapsePanel, CardTitleTypo, ContentContainer, ContentTypo, Root } from './styled'

type ResultGroupCardProps = {
  className?: string
} & ResultLectureGroupItemType

export const ResultGroupCard: FC<ResultGroupCardProps> = ({
  className,
  id,
  name,
  year,
  season,
  isPassed,
  isEssential,
  lectureIdentificationItem,
}) => {
  return (
    <Root className={className}>
      <CardCollapse>
        <CardCollapsePanel header={<CardTitleTypo>{`${name}`}</CardTitleTypo>} key={`lecture_group_card_${id}`}>
          <ContentContainer>
            <ContentTypo>선이수 통과 여부 : {isPassed ? 'P' : 'F'}</ContentTypo>
            <ContentTypo>
              이수 학기 : {lectureIdentificationItem.year}-{lectureIdentificationItem.season}
            </ContentTypo>
            <ContentTypo>학수 번호 : {lectureIdentificationItem.code}</ContentTypo>
            <ContentTypo>수강 학점 : {lectureIdentificationItem.credit}학점</ContentTypo>
            <ContentTypo>필수 여부 : {isEssential ? '필수' : '필수 아님'}</ContentTypo>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
