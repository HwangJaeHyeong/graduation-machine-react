import { getGraduations } from 'apis/conditions/getGraduations'
import { postConditionsCreate } from 'apis/conditions/postConditionCreate'
import { Header } from 'components/Header'
import { ContentButton } from 'components/LectureConditionCreateModal/styled'
import { useAuth } from 'hooks/useAuth'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  ContentAddContainer,
  ContentAddTypo,
  ContentContainer,
  ContentInput,
  ContentSelect,
  Root,
  TitleTypo,
} from './styled'

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
  const [year, setYear] = useState<number>()
  const [tech, setTech] = useState<'심화' | '일반'>()

  useAuth()

  const onClick입학연도과정Button = (value: 입학연도과정Type) => () => {
    navigate(`/admin/condition/detail/${value.id}/${value.year}/${value.tech}`)
  }

  const onClickAddButton = () => {
    if (!year) {
      alert('연도를 입력해주세요.')
      return
    }
    if (!tech) {
      alert('과정을 선택해주세요.')
      return
    }
    postConditionsCreate({ year, tech })
      .then((data) => {
        alert('졸업 이수 조건 추가가 완료되었습니다.')
        window.location.reload()
      })
      .catch((res) => {
        alert('졸업 이수 조건 추가에 실패하였습니다.')
      })
  }

  useEffect(() => {
    getGraduations().then((res) => {
      set입학연도과정(res.data)
    })
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
        <ContentContainer>
          <TitleTypo>졸업 요건 추가</TitleTypo>
          <ContentAddContainer>
            <ContentAddTypo>입학 연도</ContentAddTypo>
            <ContentInput
              placeholder="입학 연도를 입력해주세요."
              value={year}
              onChange={(e: any) => setYear(e.target.value)}
            />
          </ContentAddContainer>
          <ContentAddContainer>
            <ContentAddTypo>과정</ContentAddTypo>
            <ContentSelect
              style={{ width: '100%' }}
              placeholder={'과정를 선택해주세요.'}
              options={[
                { value: '심화', label: '심화' },
                { value: '일반', label: '일반' },
              ]}
              onChange={(value: any) => setTech(value)}
            />
          </ContentAddContainer>
          <ContentButton type={'primary'} onClick={onClickAddButton}>
            추가하기
          </ContentButton>
        </ContentContainer>
      </Container>
    </Root>
  )
}
