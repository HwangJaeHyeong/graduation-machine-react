import { getConditions } from 'apis/conditions/getConditions'
import { postConditions } from 'apis/conditions/postConditions'
import { Header } from 'components/Header'
import { useAuth } from 'hooks/useAuth'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LectureConditionCard } from './components/LectureConditionCard'
import {
  Container,
  ContentAddButtonIcon,
  ContentButton,
  ContentContainer,
  ContentInput,
  Root,
  TitleTypo,
} from './styled'
import { LectureConditionListType } from './type'

type AdminConditionDetailPageProps = {
  className?: string
}

export const AdminConditionDetailPage: FC<AdminConditionDetailPageProps> = ({ className }) => {
  const { id, year, tech } = useParams()
  const [totalMinimumCredit, setTotalMinimumCredit] = useState<number>(0)
  const [lectureConditionList, setLectureConditionList] = useState<LectureConditionListType>([])

  useAuth()

  const updateLectureConditionList = () => {
    if (id && year && tech) {
      getConditions({ id: +id, year: +year, tech }).then((res) => {
        setLectureConditionList(res.data.requirements)
        setTotalMinimumCredit(res.data.totalMinimumCredit)
      })
    }
  }

  const onClickAddButton = () => {
    if (id) {
      postConditions({ graduationId: +id, name: '새로운 조건', minimumCredit: 0 }).then((res) => {
        if (res.success) {
          updateLectureConditionList()
        }
      })
    }
  }

  useEffect(() => {
    updateLectureConditionList()
  }, [])

  return (
    <Root className={className}>
      <Header type={'ADMIN'} />
      <Container>
        <TitleTypo>
          {year}년도 {tech}과정 입학생 졸업 이수 조건 수정
        </TitleTypo>
        <ContentContainer>
          <ContentInput addonBefore={'최소 이수 학점'} value={totalMinimumCredit} />
          {lectureConditionList.map((lectureConditionItem) => (
            <LectureConditionCard
              id={lectureConditionItem.id}
              name={lectureConditionItem.name}
              minimumCredit={lectureConditionItem.minimumCredit}
              key={`lecture_condition_item_${lectureConditionItem.id}`}
            />
          ))}
          <ContentButton type={'primary'} onClick={onClickAddButton}>
            조건 추가 <ContentAddButtonIcon />
          </ContentButton>
        </ContentContainer>
      </Container>
    </Root>
  )
}
