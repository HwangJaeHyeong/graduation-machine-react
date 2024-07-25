import { Button, Input, Select, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 80px 0;
`

export const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px #c9c9c9 solid;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`

export const HeaderLogoTypo = styled(Typography)`
  &&& {
    font-size: 32px;
    font-weight: 700;
  }
`

export const HeaderMenuContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const ContentContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px 20px;
  box-sizing: border-box;
  border: 1px #c9c9c9 solid;
  border-radius: 8px;
  margin-top: 20px;
`

export const ContentInput = styled(Input)``
export const ContentButton = styled(Button)`
  width: 100%;
`

export const ContentSelectField = styled(Select)`
  width: 100%;
`

export const SpreadSheetWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  table {
    max-width: 960px;
  }
  td {
    max-width: 600px;
  }
  margin-top: 20px;
`

export const SpreadSheetTitleTypo = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  color: #111;
`
