import logo02Img from 'constants/images/logo_02.png'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { LogoImg, MenuContainer, MenuTypo, Root } from './styled'

type HeaderProps = {
  className?: string
  type?: 'ADMIN' | 'USER'
}

export const Header: FC<HeaderProps> = ({ className, type = 'USER' }) => {
  const { pathname } = useLocation()

  return (
    <Root className={className}>
      <LogoImg alt={'로고 이미지'} src={logo02Img} />
      {type === 'ADMIN' && (
        <MenuContainer>
          <MenuTypo isPointed={pathname.indexOf('condition') !== -1}>졸업 이수 조건 수정</MenuTypo>
          <MenuTypo isPointed={pathname.indexOf('timetable') !== -1}>전체 시간표 입력</MenuTypo>
          <MenuTypo isPointed={pathname.indexOf('common-lecture-group') !== -1}>공통 강의 그룹 수정</MenuTypo>
        </MenuContainer>
      )}
    </Root>
  )
}
