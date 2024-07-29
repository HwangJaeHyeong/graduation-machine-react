import { Header } from 'components/Header'
import { ContentButton } from 'components/LectureConditionCreateModal/styled'
import { useAuth } from 'hooks/useAuth'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, ContentContainer, Root, TitleTypo } from './styled'

type AdminConditionPageProps = {
  className?: string
}

const 입학연도과정_LIST = [
  {
    연도: 2024,
    과정: '심화',
  },
  {
    연도: 2024,
    과정: '일반',
  },
  {
    연도: 2023,
    과정: '심화',
  },
  {
    연도: 2023,
    과정: '일반',
  },
  {
    연도: 2022,
    과정: '심화',
  },
  {
    연도: 2022,
    과정: '일반',
  },
  {
    연도: 2021,
    과정: '심화',
  },
  {
    연도: 2021,
    과정: '일반',
  },
  {
    연도: 2020,
    과정: '심화',
  },
  {
    연도: 2020,
    과정: '일반',
  },
]

export const AdminConditionPage: FC<AdminConditionPageProps> = ({ className }) => {
  const navigate = useNavigate()

  useAuth()

  const onClick입학연도과정Button = (value: { 연도: number; 과정: string }) => () => {
    navigate(`/admin/condition/detail/${value.연도}/${value.과정}`)
  }

  return (
    <Root className={className}>
      <Header type={'ADMIN'} />
      <Container>
        <TitleTypo>졸업 이수 조건을 수정할 입학연도와 과정을 선택해주세요.</TitleTypo>
        <ContentContainer>
          {입학연도과정_LIST.map((value) => (
            <ContentButton
              size={'large'}
              key={`입학연도과정_item_${value}`}
              onClick={onClick입학연도과정Button(value)}
            >{`${value.연도}년 ${value.과정}과정`}</ContentButton>
          ))}
        </ContentContainer>
      </Container>
    </Root>
  )
}
