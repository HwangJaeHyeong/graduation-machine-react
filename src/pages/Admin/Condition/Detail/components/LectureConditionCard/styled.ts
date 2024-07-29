import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Collapse, Input, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 1000px;
`

export const CardCollapse = styled(Collapse)`
  width: 100%;
`

export const CardCollapsePanel = styled(Collapse.Panel)``

export const CardTitleTypo = styled(Typography)`
  font-weight: 500;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ContentInput = styled(Input)``

export const ContentButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContentAddButtonIcon = styled(PlusCircleOutlined)`
  font-size: 18px;
`
