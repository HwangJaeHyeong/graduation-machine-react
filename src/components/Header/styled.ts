import { Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  height: 95px;
  background: #ea5514f7;
  display: flex;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;
  position: relative;
`

export const LogoImg = styled.img`
  width: 330px;
  height: 56px;
  object-fit: contain;
`

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 20px;
`

export const MenuTypo = styled(Typography)<{ isPointed?: boolean }>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.isPointed ? `#fff` : `#fffa`)};
  cursor: pointer;
`
