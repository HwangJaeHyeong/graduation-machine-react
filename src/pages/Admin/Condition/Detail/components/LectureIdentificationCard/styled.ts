import { DeleteOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  border: 1px #d9d9d9 solid;
  padding: 5px 10px;
`

export const ContentTypo = styled(Typography)``

export const ContentButton = styled(Button)``

export const DeleteIcon = styled(DeleteOutlined)``
