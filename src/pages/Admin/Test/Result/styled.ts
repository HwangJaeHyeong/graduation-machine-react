import { Typography } from 'antd'
import { COMMON_MIN_WIDTH } from 'constants/layout'
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
  width: ${COMMON_MIN_WIDTH}px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  box-shadow: 0px 2px 6px 0px #00000040;
  border-top: 2px solid var(--dgu_orange, #ea5514f7);
  padding: 20px;
  box-sizing: border-box;
`

export const TitleTypo = styled(Typography)`
  width: ${COMMON_MIN_WIDTH}px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 0 20px;
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

export const InfoTitleTypo = styled(Typography)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

export const InfoTypo = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
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
