import { ResultLectureConditionItemType } from 'pages/Result/type'
import { FC } from 'react'
import { CardCollapse, CardCollapsePanel, CardTitleTypo, ContentContainer, ContentTypo, Root } from './styled'

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
}) => {
  return (
    <Root className={className}>
      <CardCollapse>
        <CardCollapsePanel header={<CardTitleTypo>{`${name}`}</CardTitleTypo>} key={`lecture_condition_card_${id}`}>
          <ContentContainer>
            <ContentTypo>이수 학점/최소 학점 : {`${passedCredit}/${minimumCredit}`}</ContentTypo>
            <ContentTypo>통과 여부 : {isPassed ? 'P' : 'F'}</ContentTypo>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
