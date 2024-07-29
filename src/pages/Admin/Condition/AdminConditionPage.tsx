import { Header } from 'components/Header'
import { ContentButton } from 'components/LectureConditionCreateModal/styled'
import { useAuth } from 'hooks/useAuth'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, ContentContainer, Root, TitleTypo } from './styled'

type AdminConditionPageProps = {
  className?: string
}

const 입학연도_LIST = [2024, 2023, 2022, 2021, 2020, 2019]

export const AdminConditionPage: FC<AdminConditionPageProps> = ({ className }) => {
  const navigate = useNavigate()

  useAuth()

  const onClick입학연도Button = (value: number) => () => {
    navigate(`/admin/condition/detail/${value}`)
  }

  return (
    <Root className={className}>
      <Header type={'ADMIN'} />
      <Container>
        <TitleTypo>졸업 이수 조건을 수정할 입학연도를 선택해주세요.</TitleTypo>
        <ContentContainer>
          {입학연도_LIST.map((value) => (
            <ContentButton
              size={'large'}
              key={`입학연도_item_${value}`}
              onClick={onClick입학연도Button(value)}
            >{`${value}년`}</ContentButton>
          ))}
        </ContentContainer>
      </Container>
    </Root>
  )
}
