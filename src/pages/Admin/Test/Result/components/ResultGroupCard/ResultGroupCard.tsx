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
  isPassed,
  isEssential,
  lectureIdentificationItem,
  multiLectureIdentificationItem,
}) => {
  return (
    <Root className={className}>
      <CardCollapse>
        <CardCollapsePanel header={<CardTitleTypo>{`${name}`}</CardTitleTypo>} key={`lecture_group_card_${id}`}>
          <ContentContainer>
            <ContentTypo>선이수 통과 여부 : {isPassed ? 'P' : 'F'}</ContentTypo>
            {Object.values(lectureIdentificationItem).length > 0 && (
              <>
                <ContentTypo>
                  이수 학기 : {lectureIdentificationItem.year}-{lectureIdentificationItem.season}
                </ContentTypo>
                <ContentTypo>학수 번호 : {lectureIdentificationItem.code}</ContentTypo>
                <ContentTypo>수강 학점 : {lectureIdentificationItem.credit}학점</ContentTypo>
              </>
            )}
            {multiLectureIdentificationItem.length > 0 &&
              multiLectureIdentificationItem.map((item, index) => (
                <div key={`multi_lecture_identification_${index}`}>
                  <ContentTypo>강의 명 : {item.name}</ContentTypo>
                  <ContentTypo>
                    이수 학기 : {item.year}-{item.season}
                  </ContentTypo>
                  <ContentTypo>학수 번호 : {item.code}</ContentTypo>
                  <ContentTypo>수강 학점 : {item.credit}학점</ContentTypo>
                </div>
              ))}
            <ContentTypo>필수 여부 : {isEssential ? '필수' : '필수 아님'}</ContentTypo>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
