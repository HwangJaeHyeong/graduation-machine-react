import { Header } from 'components/Header'
import banner01Img from 'constants/images/banner_01.png'
import logo01Img from 'constants/images/logo_01.png'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BannerImg,
  ButtonContainer,
  ContentContainer,
  LogoImg,
  LogoImgWrapper,
  Root,
  SubmitButton,
  SubtitleTypo,
  TitleContainer,
  TitleTypo,
} from './styled'

type MainPageProps = {
  className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onClickSubmitButton = () => {
    navigate('/submit')
  }

  return (
    <Root className={className}>
      <Header />
      <BannerImg src={banner01Img} alt={'배너 이미지'} />
      <ContentContainer>
        <LogoImgWrapper>
          <LogoImg src={logo01Img} alt={'동국대학교 로고 이미지'} />
        </LogoImgWrapper>
        <TitleContainer>
          <TitleTypo>동국대학교 컴퓨터 공학전공 졸업요건 검사 사이트</TitleTypo>
          <SubtitleTypo>DGU Graduation Machine</SubtitleTypo>
        </TitleContainer>
        <ButtonContainer>
          <SubmitButton type={'primary'} onClick={onClickSubmitButton}>
            검사하기
          </SubmitButton>
        </ButtonContainer>
      </ContentContainer>
    </Root>
  )
}
