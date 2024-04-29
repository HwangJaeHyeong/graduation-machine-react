import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as XLSX from 'xlsx/xlsx.mjs'
import {
  ContentContainer,
  ContentInput,
  ContentSubmitButton,
  HeaderContainer,
  HeaderLogoTypo,
  HeaderMenuContainer,
  HeaderMenuShareButton,
  Root,
  SpreadsheetWrapper,
} from './styled'
import { majorList } from 'constants/major'
import { Spreadsheet } from 'react-spreadsheet'
import { TABLE_COLUMN_TITLE } from 'pages/Lecture/Excel/constant'

type GraduationDecisionPageProps = {
  className?: string
}

export const GraduationDecisionPage: FC<GraduationDecisionPageProps> = ({ className }) => {
  const { major_code: majorCode, year: selectedYear } = useParams()
  const majorItem = majorList.filter((majorItem) => majorItem.code === majorCode)[0]
  const [excelData, setExcelData] = useState<any>([])
  const [loading, setLoading] = useState<'LOADING' | 'NONE'>('NONE')
  const washedSelectedYear = selectedYear ? +selectedYear : 0

  const handleFile = (e: any) => {
    setLoading('LOADING')
    const files = e.target.files
    if (!(files || files[0])) {
      return
    }
    const file = files[0]

    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e: any) => {
      const bstr = e.target.result
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[]
      e.target.value = null
      const washedData = data
        .filter((_, index) => index !== 0)
        .map((value) => ({
          year: value[0],
          season: value[1],
          code: value[5],
          name: `${value[7]}(${value[19]})`,
          grade: value[10] !== 'F' ? 'NF' : 'F',
        }))
      setExcelData(washedData)
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
    setLoading('NONE')
  }
  console.log({ excelData })

  const washedExcelData =
    excelData &&
    excelData.map((item: any) => [
      { value: item.year, readOnly: true },
      { value: item.season, readOnly: true },
      { value: item.code, readOnly: true },
      { value: item.name, readOnly: true },
      { value: item.grade, readOnly: true },
    ])

  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>
          {washedSelectedYear}학번 {majorItem.label} 졸업 테스트
        </HeaderLogoTypo>
        <HeaderMenuContainer>
          <HeaderMenuShareButton />
        </HeaderMenuContainer>
      </HeaderContainer>
      <ContentContainer>
        <span>엑셀 파일 입력</span>
        <ContentInput
          disabled={loading === 'LOADING'}
          type="file"
          className="form-control"
          id="file"
          accept={'xlsx'}
          onChange={handleFile}
        />
        <SpreadsheetWrapper>
          {washedExcelData && <Spreadsheet data={washedExcelData} columnLabels={TABLE_COLUMN_TITLE} />}
        </SpreadsheetWrapper>
        <ContentSubmitButton type={'primary'} disabled={washedExcelData.length === 0 || loading === 'LOADING'}>
          졸업요건 테스트하기
        </ContentSubmitButton>
      </ContentContainer>
    </Root>
  )
}
