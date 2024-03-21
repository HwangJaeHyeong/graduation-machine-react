import { FC } from 'react'

import { ContentContainer, HeaderContainer, HeaderLogoTypo, Root } from './styled'

type LectureExcelPageProps = {
  className?: string
}

export const LectureExcelPage: FC<LectureExcelPageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>종합 시간표 엑셀 입력하기</HeaderLogoTypo>
      </HeaderContainer>
      <ContentContainer>asd</ContentContainer>
    </Root>
  )
}
