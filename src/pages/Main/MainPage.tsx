import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { SAMPLE_CSE_KEY_LIST } from './constant'
import {
  ContentButton,
  ContentButtonContainer,
  ContentContainer,
  ContentTitleTypo,
  HeaderContainer,
  HeaderLogoTypo,
  Root,
} from './styled'

type MainPageProps = {
  className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onClickMajorButton = (majorItemCode: string, year: number) => () => {
    navigate(`/condition/edit/${majorItemCode}/${year}`)
  }

  const onClickLectureExcelButton = () => {
    navigate(`/lecture/excel`)
  }

  const onClickLectureGroupButton = () => {
    navigate(`/lecture/group`)
  }

  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>졸업 판정기</HeaderLogoTypo>
      </HeaderContainer>
      <ContentContainer>
        <ContentTitleTypo>컴퓨터공학전공 졸업 요건 수정</ContentTitleTypo>
        <ContentButtonContainer>
          {SAMPLE_CSE_KEY_LIST.map((keyItem) => (
            <ContentButton onClick={onClickMajorButton('CSE', keyItem.year)} key={`cse_${keyItem.year}`}>
              {keyItem.label}
            </ContentButton>
          ))}
        </ContentButtonContainer>
      </ContentContainer>
      <ContentContainer>
        <ContentTitleTypo>전체 강의 정보 입력</ContentTitleTypo>
        <ContentButtonContainer>
          <ContentButton onClick={onClickLectureExcelButton}>전체 강의 정보 입력(엑셀)</ContentButton>
        </ContentButtonContainer>
      </ContentContainer>
      <ContentContainer>
        <ContentTitleTypo>강의 그룹</ContentTitleTypo>
        <ContentButtonContainer>
          <ContentButton onClick={onClickLectureGroupButton}>강의 그룹 관리</ContentButton>
        </ContentButtonContainer>
      </ContentContainer>
    </Root>
  )
}
