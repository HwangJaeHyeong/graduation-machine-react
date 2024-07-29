import { ArrowsAltOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 40px;
`

export const Container = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  box-shadow: 0px 2px 6px 0px #00000040;
  border-top: 2px solid var(--dgu_orange, #ea5514f7);
  padding: 20px;
  box-sizing: border-box;
`

export const TitleTypo = styled(Typography)`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 0 40px;
  box-sizing: border-box;
  margin-top: 20px;
`

export const ContentDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #333;
`

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`

export const InfoTypo = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: #595959;
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  border: 1px #d9d9d9 solid;
  border-radius: 8px;
  margin-top: 12px;
`

export const ContentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentTable = styled.table`
  width: 100%;
  border: 1px #111 solid;
  margin-top: 40px;
`

export const ContentTableHeader = styled.th`
  height: 60px;
  background: #ffb259b2;
`

export const ContentTableHeaderTypo = styled(Typography)`
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContentTableContent = styled.td`
  height: 50px;
`

export const ContentTableContentTypo = styled(Typography)`
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContentSpreadIcon = styled(ArrowsAltOutlined)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
