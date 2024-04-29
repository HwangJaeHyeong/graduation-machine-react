import { Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  border: 1px #eee solid;
  border-radius: 8px;
  gap: 10px;
`

export const TitleTypo = styled(Typography)`
  &&& {
    font-size: 16px;
    font-weight: bold;
  }
`

export const GroupCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const GroupCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px #eee solid;
  box-sizing: border-box;
`

export const GroupCardTitleTypo = styled(Typography)`
  &&& {
    font-size: 14px;
  }
`

export const GroupCardEssentialTypo = styled(Typography)`
  &&& {
    font-size: 14px;
  }
`

export const GroupCardCheckLectureTakenTypo = styled(Typography)`
  &&& {
    font-size: 14px;
  }
`
