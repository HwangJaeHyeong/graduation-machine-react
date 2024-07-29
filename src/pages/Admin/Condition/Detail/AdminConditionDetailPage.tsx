import { Header } from 'components/Header'
import { useAuth } from 'hooks/useAuth'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { LectureConditionCard } from './components/LectureConditionCard'
import { Container, ContentContainer, ContentInput, Root, TitleTypo } from './styled'

type AdminConditionDetailPageProps = {
  className?: string
}

export const AdminConditionDetailPage: FC<AdminConditionDetailPageProps> = ({ className }) => {
  const { id } = useParams()

  useAuth()
  return (
    <Root className={className}>
      <Header type={'ADMIN'} />
      <Container>
        <TitleTypo>{id}년도 입학생 졸업 이수 조건 수정</TitleTypo>
        <ContentContainer>
          <ContentInput addonBefore={'최저 이수 학점'} value={140} />
          <LectureConditionCard />
        </ContentContainer>
      </Container>
    </Root>
  )
}
