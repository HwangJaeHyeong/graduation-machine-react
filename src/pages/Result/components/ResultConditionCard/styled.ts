import { Collapse, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
`

export const CardCollapse = styled(Collapse)`
  width: 100%;
`

export const CardCollapsePanel = styled(Collapse.Panel)``

export const CardTitleTypo = styled(Typography)``

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ContentTypo = styled(Typography)``
