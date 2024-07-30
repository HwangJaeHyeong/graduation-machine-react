import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Collapse, Input, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
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
  font-size: 16px;
`

export const ContentDeleteButtonIcon = styled(MinusCircleOutlined)`
  font-size: 16px;
`

export const ContentTitleTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
`
export const ContentTypo = styled(Typography)``

export const ContentLectureContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
`
