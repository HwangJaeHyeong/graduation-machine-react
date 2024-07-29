import { getConditions } from 'apis/conditions/getConditions'
import { Header } from 'components/Header'
import { ContentButton } from 'components/LectureConditionCreateModal/styled'
import { useAuth } from 'hooks/useAuth'
import { FC, useEffect, useState } from 'react'
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

type 입학연도과정Type = { year: number; tech: '심화' | '일반'; id: number }

export const AdminConditionPage: FC<AdminConditionPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [입학연도과정, set입학연도과정] = useState<입학연도과정Type[]>([])

  useAuth()

  const onClick입학연도과정Button = (value: 입학연도과정Type) => () => {
    navigate(`/admin/condition/detail/${value.id}/${value.year}/${value.tech}`)
  }

  useEffect(() => {
    getConditions().then((value) => set입학연도과정(value))
  }, [])

  return (
    <Root className={className}>
      <Header type={'ADMIN'} />
      <Container>
        <TitleTypo>졸업 이수 조건을 수정할 입학연도와 과정을 선택해주세요.</TitleTypo>
        <ContentContainer>
          {입학연도과정 &&
            입학연도과정.map((value) => (
              <ContentButton
                size={'large'}
                key={`입학연도과정_item_${value}`}
                onClick={onClick입학연도과정Button(value)}
              >{`${value.year}년 ${value.tech}과정`}</ContentButton>
            ))}
        </ContentContainer>
      </Container>
    </Root>
  )
}
