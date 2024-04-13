import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Select, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SummaryTypo = styled(Typography)`
  padding-left: 10px;
`

export const ContentButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const ContentButton = styled(Button)`
  width: 100%;
`

export const ModalRoot = styled(Modal)``

export const ModalContentRoot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`

export const ModalSubmitButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`

export const ModalSelectField = styled(Select)`
  &&& {
    width: 100%;
  }
`

export const ModalContentRowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

export const ContentCheckbox = styled(Input)`
  width: fit-content;
`
export const ContentTypo = styled(Typography)``

export const ContentSubmitButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ContentAddButtonIcon = styled(PlusCircleOutlined)`
  font-size: 18px;
`
