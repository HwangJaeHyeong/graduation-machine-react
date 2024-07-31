import { Header } from 'components/Header'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Container,
  ContentSpreadIcon,
  ContentTable,
  ContentTableContainer,
  ContentTableContent,
  ContentTableContentTypo,
  ContentTableHeader,
  ContentTableHeaderTypo,
  InfoContainer,
  InfoTypo,
  Root,
  TitleTypo,
} from './styled'

type ResultPageProps = {
  className?: string
}

export const ResultPage: FC<ResultPageProps> = ({ className }) => {
  const {
    state: { graduationCheckData },
  } = useLocation()

  return (
    <Root className={className}>
      <Header />
      <TitleTypo>졸업 판정 결과</TitleTypo>
      <Container>
        <InfoContainer>
          <InfoTypo>학번 : 20, 과정 : 심화, 통과여부 : Y, 총 수강학점 : 91/130 </InfoTypo>
        </InfoContainer>
        <ContentTableContainer>
          <ContentTable>
            <tr>
              <ContentTableHeader>
                <ContentTableHeaderTypo>번호</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>LectureCondition</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>최소 학점</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>통과 여부</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>자세히 보기</ContentTableHeaderTypo>
              </ContentTableHeader>
            </tr>
            <tr>
              <ContentTableContent>
                <ContentTableContentTypo>1</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>{'글로벌의사소통 > 글쓰기'}</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>Y</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>3</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentSpreadIcon />
              </ContentTableContent>
            </tr>
          </ContentTable>

          <ContentTable>
            <tr>
              <ContentTableHeader>
                <ContentTableHeaderTypo>번호</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>LectureGroup</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>필수 여부</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>수강 여부</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>자세히 보기</ContentTableHeaderTypo>
              </ContentTableHeader>
            </tr>
            <tr>
              <ContentTableContent>
                <ContentTableContentTypo>1</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>{'글로벌의사소통 > 글쓰기'}</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>N</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>Y</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentSpreadIcon />
              </ContentTableContent>
            </tr>
          </ContentTable>

          <ContentTable>
            <tr>
              <ContentTableHeader>
                <ContentTableHeaderTypo>번호</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>LectureIdentification</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>학수번호</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>학점</ContentTableHeaderTypo>
              </ContentTableHeader>
              <ContentTableHeader>
                <ContentTableHeaderTypo>수강 학기</ContentTableHeaderTypo>
              </ContentTableHeader>
            </tr>
            <tr>
              <ContentTableContent>
                <ContentTableContentTypo>1</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>{'글로벌의사소통 > 글쓰기'}</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>N</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>Y</ContentTableContentTypo>
              </ContentTableContent>
              <ContentTableContent>
                <ContentTableContentTypo>22년도 2학기</ContentTableContentTypo>
              </ContentTableContent>
            </tr>
          </ContentTable>
        </ContentTableContainer>
      </Container>
    </Root>
  )
}
