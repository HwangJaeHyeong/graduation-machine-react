import logo02Img from 'constants/images/logo_02.png'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogoImg, MenuContainer, MenuTypo, Root } from './styled'

type HeaderProps = {
  className?: string
  type?: 'ADMIN' | 'USER'
}

export const Header: FC<HeaderProps> = ({ className, type = 'USER' }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const onClickMenu = (type: 'CONDITION' | 'TIMETABLE' | 'COMMON_LECTURE_GROUP' | 'TEST') => () => {
    if (type === 'CONDITION') {
      navigate('/admin/condition')
      return
    }
    if (type === 'TIMETABLE') {
      navigate('/admin/timetable')
      return
    }
    if (type === 'COMMON_LECTURE_GROUP') {
      navigate('/admin/common-lecture-group')
      return
    }
    if (type === 'TEST') {
      navigate('/admin/test')
      return
    }
  }

  return (
    <Root className={className}>
      <LogoImg alt={'로고 이미지'} src={logo02Img} />
      {type === 'ADMIN' && (
        <MenuContainer>
          <MenuTypo isPointed={pathname.indexOf('condition') !== -1} onClick={onClickMenu('CONDITION')}>
            졸업 이수 조건 수정
          </MenuTypo>
          <MenuTypo isPointed={pathname.indexOf('timetable') !== -1} onClick={onClickMenu('TIMETABLE')}>
            전체 시간표 입력
          </MenuTypo>
          <MenuTypo
            isPointed={pathname.indexOf('common-lecture-group') !== -1}
            onClick={onClickMenu('COMMON_LECTURE_GROUP')}
          >
            공통 강의 그룹 수정
          </MenuTypo>
          <MenuTypo isPointed={pathname.indexOf('test') !== -1} onClick={onClickMenu('TEST')}>
            판정기 테스트
          </MenuTypo>
        </MenuContainer>
      )}
    </Root>
  )
}
