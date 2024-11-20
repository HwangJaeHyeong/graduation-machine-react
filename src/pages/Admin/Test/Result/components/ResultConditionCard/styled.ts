import { Collapse, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
`

export const RootCardCollapse = styled(Collapse)<{ isPassed: boolean }>`
  width: 100%;
  background: ${(props) => (props.isPassed ? `#f8f8f8` : `#f001`)};
  border: 1px ${(props) => (props.isPassed ? `#d9d9d9` : `#f009`)} solid;
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

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
