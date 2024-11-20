import { FC } from 'react'
import { LectureIdentificationListType } from 'types/lecture'
import {
  CardCollapse,
  CardCollapsePanel,
  CardContainer,
  CardTitleTypo,
  ContentContainer,
  ContentTypo,
  Root,
} from './styled'

type ExceptionEducationCardProps = {
  className?: string
  lectureIdentificationList: LectureIdentificationListType
}

export const ExceptionEducationCard: FC<ExceptionEducationCardProps> = ({ className, lectureIdentificationList }) => {
  let passedCredit = (() => {
    let credit = 0
    lectureIdentificationList.forEach((value) => {
      credit += value.credit
    })
    return credit
  })()

  return (
    <Root className={className}>
      <CardCollapse>
        <CardCollapsePanel
          header={<CardTitleTypo>{`조회되지 않은 강의`}</CardTitleTypo>}
          key={`lecture_condition_card_general_education`}
        >
          <ContentContainer>
            <CardContainer>
              {lectureIdentificationList.map((lectureIdentificationItem) => (
                <CardCollapse key={`lecture_condition_card_exception_education_${lectureIdentificationItem.id}`}>
                  <CardCollapsePanel
                    header={<CardTitleTypo>{`${lectureIdentificationItem.name}`}</CardTitleTypo>}
                    key={`lecture_condition_card_exception_education_${lectureIdentificationItem.id}`}
                  >
                    <ContentContainer>
                      <CardContainer>
                        <ContentTypo>
                          이수 학기 : {lectureIdentificationItem.year}-{lectureIdentificationItem.season}
                        </ContentTypo>
                        <ContentTypo>학수 번호 : {lectureIdentificationItem.code}</ContentTypo>
                        <ContentTypo>수강 학점 : {lectureIdentificationItem.credit}학점</ContentTypo>
                      </CardContainer>
                    </ContentContainer>
                  </CardCollapsePanel>
                </CardCollapse>
              ))}
            </CardContainer>
            <ContentTypo>이수 학점 : {`${passedCredit}`}</ContentTypo>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
