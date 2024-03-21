import { majorList } from 'constants/major'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentButton, ContentContainer, HeaderContainer, HeaderLogoTypo, Root } from './styled'

type MainPageProps = {
  className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onClickMajorButton = (majorItemCode: string) => () => {
    navigate(`/condition/edit/${majorItemCode}`)
  }

  const onClickLectureExcelButton = () => {
    navigate(`/lecture/excel`)
  }

  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>졸업 판정기</HeaderLogoTypo>
      </HeaderContainer>
      <ContentContainer>
        {majorList.map((majorItem) => (
          <ContentButton onClick={onClickMajorButton(majorItem.code)} key={`major_item_${majorItem.code}`}>
            {majorItem.label}
          </ContentButton>
        ))}
      </ContentContainer>
      <ContentContainer>
        <ContentButton onClick={onClickLectureExcelButton}>전체 강의 정보 입력(엑셀)</ContentButton>
      </ContentContainer>
    </Root>
  )
}
