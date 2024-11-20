import { Header } from 'components/Header'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { LectureIdentificationListType } from 'types/lecture'
import { ExceptionEducationCard } from './components/ExceptionEducationCard'
import { GeneralEducationCard } from './components/GeneralEducationCard'
import { ResultConditionCard } from './components/ResultConditionCard'
import { Container, InfoContainer, InfoTitleTypo, InfoTypo, Root, TitleTypo } from './styled'
import { ResultLectureConditionListType } from './type'

type ResultPageProps = {
  className?: string
}

export const ResultPage: FC<ResultPageProps> = ({ className }) => {
  const {
    state: { graduationCheckData },
  } = useLocation()

  if (!graduationCheckData) {
    return <div>잘못된 접근입니다.</div>
  }

  const lectureConditionList = graduationCheckData.lectureConditionList as ResultLectureConditionListType
  const totalCredit = graduationCheckData.total_credit as { ratio: string; value: boolean }
  const grade = graduationCheckData.grade as { gpa: string; isPassed: boolean }
  const generalEducationList = graduationCheckData.generalEducation as LectureIdentificationListType
  const exceptionEducationList = graduationCheckData.unfilteredLectures as LectureIdentificationListType

  return (
    <Root className={className}>
      <Header />
      <TitleTypo>졸업 판정 결과</TitleTypo>
      <Container>
        <InfoContainer>
          <InfoTitleTypo>기본 정보</InfoTitleTypo>
          <InfoTypo>학번 : 20, 과정 : 심화</InfoTypo>
          <InfoTypo>
            총 수강 학점 : {totalCredit.ratio}, 통과 여부 : {totalCredit.value ? 'P' : 'F'}
          </InfoTypo>
          <InfoTypo>
            GPA: {grade.gpa.slice(0, 4)}, 통과 여부 : {grade.gpa ? 'P' : 'F'}
          </InfoTypo>
        </InfoContainer>
      </Container>
      <Container>
        <InfoContainer>
          <InfoTitleTypo>판정 결과</InfoTitleTypo>
          {lectureConditionList.map((lectureConditionItem) => (
            <ResultConditionCard {...lectureConditionItem} key={`result_condition_card_${lectureConditionItem.id}`} />
          ))}
          {generalEducationList.length > 0 && <GeneralEducationCard lectureIdentificationList={generalEducationList} />}
          {exceptionEducationList.length > 0 && (
            <ExceptionEducationCard lectureIdentificationList={exceptionEducationList} />
          )}
        </InfoContainer>
      </Container>
    </Root>
  )
}
