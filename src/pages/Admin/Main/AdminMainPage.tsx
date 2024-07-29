import { message } from 'antd'
import { Header } from 'components/Header'
import banner01Img from 'constants/images/banner_01.png'
import logo01Img from 'constants/images/logo_01.png'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BannerImg,
  ButtonContainer,
  CaptionTypo,
  ContentContainer,
  LoginInput,
  LogoImg,
  LogoImgWrapper,
  Root,
  SubmitButton,
  SubtitleTypo,
  TitleContainer,
  TitleTypo,
} from './styled'

type AdminMainPageProps = {
  className?: string
}

export const AdminMainPage: FC<AdminMainPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onClickSubmitButton = () => {
    if (username === 'admin' && password === 'admin1234!') {
      localStorage.setItem('access_token', 'TEST')
      navigate('/admin/condition')
      return
    }
    message.error('잘못된 입력 정보입니다.')
    return
  }

  const onKeyPressEnter = (e: any) => {
    if (e.key === 'Enter') {
      onClickSubmitButton()
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken === 'TEST') {
      navigate('/admin/condition')
    }
  }, [])

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
          <SubtitleTypo style={{ justifyContent: 'flex-start' }}>관리자 시스템</SubtitleTypo>
        </TitleContainer>
        <ButtonContainer>
          <LoginInput
            placeholder="아이디를 입력해주세요."
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            onKeyDown={onKeyPressEnter}
          />
          <LoginInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            onKeyDown={onKeyPressEnter}
          />
          <SubmitButton type={'primary'} onClick={onClickSubmitButton}>
            로그인
          </SubmitButton>
          <CaptionTypo>관리자가 아닌 경우 서비스를 이용하실 수 없습니다.</CaptionTypo>
        </ButtonContainer>
      </ContentContainer>
    </Root>
  )
}
