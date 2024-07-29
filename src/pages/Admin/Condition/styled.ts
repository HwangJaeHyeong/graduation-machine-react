import { Button, Typography } from 'antd'
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
  width: 600px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

export const TitleTypo = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`

export const ContentButton = styled(Button)`
  &&& {
    font-size: 20px;
  }
`
