import { Collapse, Typography } from 'antd'
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
  margin-top: 10px;
`

export const GroupCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
`

export const GroupCardSectionTitleTypo = styled(Typography)`
  &&& {
    font-size: 14px;
    font-weight: 500;
  }
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

export const GroupCardCreditTypo = styled(Typography)`
  &&& {
    font-size: 14px;
  }
`

export const ContentCardCollapse = styled(Collapse)``

export const ContentCardCollapseInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const PreviousLectureContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  border: 1px #eee solid;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
`

export const PreviousLectureTitleTypo = styled(Typography)`
  &&& {
    font-size: 14px;
  }
`

export const PreviousLectureContentTypo = styled(Typography)`
  &&& {
    font-size: 12px;
  }
`

export const TotalTakenCreditTypo = styled(Typography)`
  &&& {
    font-size: 16px;
    margin-left: 4px;
  }
`

export const ResultTypo = styled(Typography)`
  &&& {
    font-size: 16px;
    margin-left: 4px;
  }
`
