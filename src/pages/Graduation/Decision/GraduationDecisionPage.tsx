import { GraduationDecisionCard } from 'components/GraduationDecisionCard'
import { AvailableYearType } from 'constants/lecture'
import { AvailableMajorType, majorList } from 'constants/major'
import { GRADUATION_DECISION_TABLE_COLUMN_TITLE } from 'pages/Lecture/Excel/constant'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spreadsheet } from 'react-spreadsheet'
import { ConditionListType } from 'types/common'
import { ExcelLectureListType } from 'types/lecture'
import { loadConditionFromLocalStorage } from 'utils/handleConditionLocalStorage'
import * as XLSX from 'xlsx/xlsx.mjs'
import {
  ContentContainer,
  ContentInput,
  HeaderContainer,
  HeaderLogoTypo,
  HeaderMenuContainer,
  HeaderMenuShareButton,
  Root,
  SpreadsheetWrapper,
} from './styled'

type GraduationDecisionPageProps = {
  className?: string
}

const washSeason = (season: string) => {
  if (season === '1학기') {
    return '1'
  }
  if (season === '2학기') {
    return '2'
  }
  if (season === '여름학기') {
    return 'summer'
  }
  if (season === '겨울학기') {
    return 'winter'
  }
  return 'common'
}
export const GraduationDecisionPage: FC<GraduationDecisionPageProps> = ({ className }) => {
  const { major_code: majorCode, year: selectedYear } = useParams()
  const [conditionList, setConditionList] = useState<ConditionListType>([])
  const majorItem = majorList.filter((majorItem) => majorItem.code === majorCode)[0]
  const [excelLectureList, setExcelLectureList] = useState<ExcelLectureListType>([])
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
          year: value[1],
          season: washSeason(value[2]),
          code: value[5],
          name: `${value[7]}(${value[19]})`,
          grade: value[10] !== 'F' ? 'NF' : 'F',
          credit: value[9],
        }))
      setExcelLectureList(washedData)
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
    setLoading('NONE')
  }

  const washedExcelData =
    excelLectureList &&
    excelLectureList.map((item: any) => [
      { value: item.year, readOnly: true },
      { value: item.season, readOnly: true },
      { value: item.code, readOnly: true },
      { value: item.name, readOnly: true },
      { value: item.grade, readOnly: true },
    ])

  useEffect(() => {
    if (majorItem && washedSelectedYear) {
      const loadedData = loadConditionFromLocalStorage(
        majorItem.code as AvailableMajorType,
        washedSelectedYear as AvailableYearType
      )
      if (loadedData && loadedData.length !== 0) {
        setConditionList(loadedData)
        return
      }
    }
  }, [])

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
        <span>전체 성적 엑셀 파일 입력</span>
        <ContentInput
          disabled={loading === 'LOADING'}
          type="file"
          className="form-control"
          id="file"
          accept={'xlsx'}
          onChange={handleFile}
        />
        {washedExcelData.length !== 0 && (
          <SpreadsheetWrapper>
            <Spreadsheet data={washedExcelData} columnLabels={GRADUATION_DECISION_TABLE_COLUMN_TITLE} />
          </SpreadsheetWrapper>
        )}
      </ContentContainer>
      {!(washedExcelData.length === 0 || loading === 'LOADING') && conditionList.length !== 0 && (
        <ContentContainer>
          {conditionList.map((conditionItem) => (
            <GraduationDecisionCard
              conditionList={conditionList}
              conditionItem={conditionItem}
              excelLectureList={excelLectureList}
              key={`graduation_decision_card_${conditionItem.id}`}
            />
          ))}
        </ContentContainer>
      )}
    </Root>
  )
}
