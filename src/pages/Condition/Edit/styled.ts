import { DeleteOutlined, PlusCircleOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Collapse, Input, Select, TimePicker, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 80px 0;
`

export const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px #c9c9c9 solid;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`

export const HeaderLogoTypo = styled(Typography)`
  &&& {
    font-size: 32px;
    font-weight: 700;
  }
`

export const HeaderMenuContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const HeaderMenuShareButton = styled(ShareAltOutlined)`
  font-size: 24px;
  cursor: pointer;
`

export const ContentContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px 20px;
  box-sizing: border-box;
  border: 1px #c9c9c9 solid;
  border-radius: 8px;
  margin-top: 20px;
`

export const ContentCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ContentCard = styled.div``

export const ContentCardCollapse = styled(Collapse)``

export const ContentCardTitleTypo = styled(Typography)`
  font-weight: 500;
`

export const ContentAddContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`

export const ContentCardFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`

export const ContentInputField = styled(Input)``

export const ContentTextAreaField = styled(TextArea)``

export const ContentCardTimePickerFieldContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ContentTimePickerField = styled(TimePicker)`
  width: 100%;
`

export const ContentSelectField = styled(Select)``

export const ContentCardDeleteButton = styled(Button)`
  width: 100%;
  background: #ff000088;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  &:hover {
    &&& {
      background: #ff0000aa;
    }
  }
`

export const ContentLectureConditionGroupTitleTypo = styled(Typography)`
  font-size: 14px;
`

export const ContentCardDeleteButtonTypo = styled(Typography)`
  font-size: 14px;
  color: white;
`

export const ContentCardDeleteButtonIcon = styled(DeleteOutlined)`
  font-size: 16px;
`

export const ContentAddButton = styled(Button)`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

export const ContentAddButtonTypo = styled(Typography)`
  font-size: 16px;
  color: white;
`

export const ContentAddButtonIcon = styled(PlusCircleOutlined)`
  font-size: 18px;
`

export const ContentSubmitButton = styled(Button)`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

export const ContentSubmitButtonTypo = styled(Typography)`
  font-size: 16px;
`

export const ContentButton = styled(Button)`
  width: 100%;
`

export const ContentLectureGroupContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
