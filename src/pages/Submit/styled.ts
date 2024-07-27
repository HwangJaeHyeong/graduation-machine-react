import { EditFilled } from '@ant-design/icons'
import { Button, Input, Select, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 40px;
`

export const Container = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`

export const TitleTypo = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: #595959;
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  border: 1px #d9d9d9 solid;
  border-radius: 8px;
  margin-top: 12px;
`

export const ContentTitleContainer = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

export const ContentTitleTypo = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: #111;
`

export const ContentTitleBar = styled.div`
  width: 100%;
  height: 3px;
  background: #d9d9d9;
  margin-top: 5px;
`

export const ContentLogoIcon = styled(EditFilled)`
  font-size: 28px;
  color: #595959;
  position: absolute;
  left: 0;
  top: 0;
`

export const ContentQuestionContainer = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  margin-top: 20px;
`

export const ContentQuestionItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ContentQuestionItemTitleTypo = styled(Typography)`
  font-size: 22px;
  font-weight: 500;
  color: #111;
`

export const ContentQuestionItemSelect = styled(Select)`
  width: 240px;
`

export const ContentInput = styled(Input)`
  width: 240px;
`

export const SpreadsheetWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  table {
    max-width: 700px;
  }
  td {
    max-width: 300px;
  }
  margin-top: 20px;
`

export const SubmitButton = styled(Button)`
  width: 700px;
  height: 45px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`
