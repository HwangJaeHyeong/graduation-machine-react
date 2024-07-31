import { Header } from 'components/Header'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, ContentTableContainer, InfoContainer, InfoTypo, Root, TitleTypo } from './styled'
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

  return (
    <Root className={className}>
      <Header />
      <TitleTypo>졸업 판정 결과</TitleTypo>
      <Container>
        <InfoContainer>
          <InfoTypo>학번 : 20, 과정 : 심화, 통과여부 : Y, 총 수강학점 : 91/130 </InfoTypo>
        </InfoContainer>
        <ContentTableContainer></ContentTableContainer>
      </Container>
    </Root>
  )
}
