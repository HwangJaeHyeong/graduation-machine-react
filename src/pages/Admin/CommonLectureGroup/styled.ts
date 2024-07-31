import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContentAddButtonIcon = styled(PlusCircleOutlined)`
  font-size: 16px;
`
