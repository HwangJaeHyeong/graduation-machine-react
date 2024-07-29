import { Button, Input, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
`

export const BannerImg = styled.img`
  width: 1920px;
  z-index: 0;
`

export const ContentContainer = styled.div`
  width: 640px;
  height: 722px;
  background: #fffb;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 64px;
  position: absolute;
  top: 135px;
  left: 50%;
  transform: translate(-50%, 0);
`

export const LogoImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const LogoImg = styled.img`
  width: 130px;
  height: 33px;
  object-fit: contain;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 55px;
`

export const TitleTypo = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: #595959;
`

export const SubtitleTypo = styled(Typography)`
  font-size: 40px;
  font-weight: bold;
  color: #595959;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 60px;
`

export const LoginInput = styled(Input)`
  width: 390px;
  height: 60px;
  font-size: 20px;
`

export const SubmitButton = styled(Button)`
  width: 390px;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 10px;
`

export const CaptionTypo = styled(Typography)`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: #7c7676;
  padding-left: 95px;
`
