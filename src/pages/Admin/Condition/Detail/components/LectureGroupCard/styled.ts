import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Collapse, Input, Select, Typography } from 'antd'
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

export const ContentTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ContentTitleTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
`

export const ContentTitleFilterSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const ContentTitleFilterSelectTypo = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
`

export const ContentTitleFilterSelect = styled(Select)`
  width: 160px;
`

export const ContentTypo = styled(Typography)``

export const ContentLectureContainer = styled.div`
  width: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
`

export const ContentIsEssentialContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

export const ContentIsEssentialCheckbox = styled(Checkbox)``

export const ContentInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`
