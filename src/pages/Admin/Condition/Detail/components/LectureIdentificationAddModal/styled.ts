import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Select } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
`

export const ContentButton = styled(Button)`
  width: 100%;
`

export const ContentModal = styled(Modal)``

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const ContentAddButtonIcon = styled(PlusCircleOutlined)`
  font-size: 16px;
`

export const ContentSelect = styled(Select)`
  width: 100%;
`

export const ContentInput = styled(Input)``
