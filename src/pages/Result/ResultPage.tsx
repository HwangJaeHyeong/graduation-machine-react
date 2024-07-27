import { Header } from 'components/Header'
import { FC } from 'react'
import { Container, Root, TitleTypo } from './styled'

type ResultPageProps = {
  className?: string
}

export const ResultPage: FC<ResultPageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Header />
      <Container>
        <TitleTypo>졸업 판정 검사를 위해 기본적인 정보를 입력해주세요.</TitleTypo>
      </Container>
    </Root>
  )
}
