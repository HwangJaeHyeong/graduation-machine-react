import { Button, Input, Select, Typography } from 'antd'
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

export const ContentAddContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ContentAddTypo = styled(Typography)`
  width: 200px;
  font-size: 24px;
  font-weight: bold;
`

export const ContentButton = styled(Button)`
  &&& {
    font-size: 20px;
  }
`

export const ContentInput = styled(Input)``

export const ContentSelect = styled(Select)`
  width: 100%;
`
