import logo02Img from 'constants/images/logo_02.png'
import { FC } from 'react'
import { LogoImg, Root } from './styled'

type HeaderProps = {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <Root className={className}>
      <LogoImg alt={'로고 이미지'} src={logo02Img} />
    </Root>
  )
}
