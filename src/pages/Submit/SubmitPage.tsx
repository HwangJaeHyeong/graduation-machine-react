import { postGraduationCheck } from 'apis/graduation/postGraduationCheck'
import { Header } from 'components/Header'
import { GRADUATION_DECISION_TABLE_COLUMN_TITLE } from 'pages/Legacy/Lecture/Excel/constant'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spreadsheet from 'react-spreadsheet'
import { ExcelLectureListType } from 'types/lecture'
import { washSeason } from 'utils/washData'
import * as XLSX from 'xlsx/xlsx.mjs'
import {
  Container,
  ContentContainer,
  ContentInput,
  ContentLogoIcon,
  ContentQuestionContainer,
  ContentQuestionItemContainer,
  ContentQuestionItemSelect,
  ContentQuestionItemTitleTypo,
  ContentTitleBar,
  ContentTitleContainer,
  ContentTitleTypo,
  Root,
  SpreadsheetWrapper,
  SubmitButton,
  TitleTypo,
} from './styled'

type SubmitPageProps = {
  className?: string
}

const 전공_구분_OPTIONS = [
  { value: '심화', label: '심화과정' },
  { value: '일반', label: '일반과정' },
]
const 학번_OPTIONS = [
  { value: 2024, label: '24학번' },
  { value: 2023, label: '23학번' },
  { value: 2022, label: '22학번' },
  { value: 2021, label: '21학번' },
  { value: 2020, label: '20학번' },
]

type ClassificationType = '일반' | '심화'
type EntranceYear = 2020 | 2021 | 2022 | 2023 | 2024

export const SubmitPage: FC<SubmitPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [classification, setClassification] = useState<ClassificationType>('심화')
  const [entranceYear, setEntranceYear] = useState<EntranceYear>(2020)
  const [excelFile, setExcelFile] = useState<any>()
  const [excelLectureList, setExcelLectureList] = useState<ExcelLectureListType>([])
  const [loading, setLoading] = useState<'LOADING' | 'NONE'>('NONE')

  const handleFile = (e: any) => {
    setLoading('LOADING')
    const files = e.target.files
    if (!(files || files[0])) {
      return
    }
    const file = files[0]
    setExcelFile(file)

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

  const onClickSubmitButton = () => {
    // navigate('/result', { state: { classification, entranceYear, excelLectureList } })
    if (excelFile) {
      setLoading('LOADING')
      postGraduationCheck({ year: entranceYear, tech: classification }, { file: excelFile }).then((data) => {
        setLoading('NONE')
        navigate('/result', { state: { graduationCheckData: data } })
      })
    }
  }

  return (
    <Root className={className}>
      <Header />
      <Container>
        <TitleTypo>졸업 판정 검사를 위해 기본적인 정보를 입력해주세요.</TitleTypo>
        <ContentContainer>
          <ContentTitleContainer>
            <ContentLogoIcon />
            <ContentTitleTypo>기본 정보</ContentTitleTypo>
            <ContentTitleBar />
          </ContentTitleContainer>
          <ContentQuestionContainer>
            <ContentQuestionItemContainer>
              <ContentQuestionItemTitleTypo>전공 구분</ContentQuestionItemTitleTypo>
              <ContentQuestionItemSelect
                options={전공_구분_OPTIONS}
                value={classification}
                onChange={(value: any) => setClassification(value)}
              />
            </ContentQuestionItemContainer>
            <ContentQuestionItemContainer>
              <ContentQuestionItemTitleTypo>입학 연도</ContentQuestionItemTitleTypo>
              <ContentQuestionItemSelect
                options={학번_OPTIONS}
                value={entranceYear}
                onChange={(value: any) => setEntranceYear(value)}
              />
            </ContentQuestionItemContainer>
            <ContentQuestionItemContainer>
              <ContentQuestionItemTitleTypo>전체 성적 excel 파일</ContentQuestionItemTitleTypo>
              <ContentInput
                disabled={loading === 'LOADING'}
                type="file"
                className="form-control"
                id="file"
                accept={'xlsx'}
                onChange={handleFile}
              />
            </ContentQuestionItemContainer>
          </ContentQuestionContainer>
          {washedExcelData.length !== 0 && (
            <>
              <SpreadsheetWrapper>
                <Spreadsheet data={washedExcelData} columnLabels={GRADUATION_DECISION_TABLE_COLUMN_TITLE} />
              </SpreadsheetWrapper>
              <SubmitButton type={'primary'} onClick={onClickSubmitButton} disabled={loading === 'LOADING'}>
                검사하기
              </SubmitButton>
            </>
          )}
        </ContentContainer>
      </Container>
    </Root>
  )
}
