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
  width: 700px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ContentExcelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ContentExcelTypo = styled(Typography)`
  width: 300px;
  font-size: 24px;
  font-weight: bold;
`

export const ContentInput = styled(Input)``

export const ContentButton = styled(Button)``

export const ContentSelect = styled(Select)``
