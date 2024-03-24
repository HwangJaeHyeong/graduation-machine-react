import { availableSeason, AvailableSeasonType, availableYears, AvailableYearType } from 'constants/lecture'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spreadsheet from 'react-spreadsheet'
import * as XLSX from 'xlsx/xlsx.mjs'
import { TABLE_COLUMN_TITLE } from './constant'
import {
  ContentButton,
  ContentContainer,
  ContentInput,
  ContentSelectField,
  HeaderContainer,
  HeaderLogoTypo,
  Root,
  SpreadSheetTitleTypo,
  SpreadSheetWrapper,
} from './styled'
import { loadTimetableFromLocalStorage, saveTimetableToLocalStorage } from './utils'

type LectureExcelPageProps = {
  className?: string
}

export const LectureExcelPage: FC<LectureExcelPageProps> = ({ className }) => {
  const [excelData, setExcelData] = useState<any>([])
  const [selectedYear, setSelectedYear] = useState<AvailableYearType>()
  const [selectedSeason, setSelectedSeason] = useState<AvailableSeasonType>()
  const [loading, setLoading] = useState<'LOADING' | 'NONE'>('NONE')
  const navigate = useNavigate()

  const selectAvailableYearOptions = availableYears.map((value) => ({ label: `${value}년도`, value }))
  const selectAvailableSeasonOptions = (() => {
    if (selectedYear) {
      return availableSeason(selectedYear).map((value) => {
        if (value === '1') {
          return { label: '1학기', value }
        }
        if (value === '2') {
          return { label: '2학기', value }
        }
        if (value === 'summer') {
          return { label: '여름학기', value }
        }
        return { label: '겨울학기', value }
      })
    }
    return undefined
  })()

  const onChangeSelectedYear = (value: any) => {
    setSelectedYear(value)
    setSelectedSeason(undefined)
    return
  }

  const onChangeSelectedSeason = (value: any) => {
    setSelectedSeason(value)
    return
  }

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
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
      e.target.value = null

      setExcelData(() => {
        let newData = data
          .map((value: any) => ({
            code: value[4],
            name: `${value[5]} (${value[27]})`,
            credit: value[10],
          }))
          .slice(1, data.length)

        return [...newData]
      })
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
    setLoading('NONE')
  }
  const washedExcelData =
    excelData &&
    excelData.map((item: any) => [
      { value: item.code, readOnly: true },
      { value: item.name, readOnly: true },
      { value: item.credit, readOnly: true },
    ])

  const onClickSubmitButton = () => {
    if (!selectedYear || !selectedSeason) {
      alert('년도와 학기를 선택해주세요.')
      return
    }
    if (excelData.length === 0) {
      alert('엑셀 파일을 입력해주세요.')
      return
    }

    saveTimetableToLocalStorage(selectedYear, selectedSeason, excelData)
    alert('저장이 완료되었습니다.')
    navigate(0)
    return
  }

  useEffect(() => {
    if (selectedYear && selectedSeason) {
      setLoading('LOADING')
      const loadedData = loadTimetableFromLocalStorage(selectedYear, selectedSeason)
      if (loadedData) {
        setExcelData(loadedData)
      }
      setLoading('NONE')
    }
  }, [selectedYear, selectedSeason])

  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>종합 시간표 엑셀 입력하기</HeaderLogoTypo>
      </HeaderContainer>
      <ContentContainer>
        <ContentSelectField
          placeholder={'년도를 선택하세요.'}
          options={selectAvailableYearOptions}
          value={selectedYear}
          onChange={onChangeSelectedYear}
          disabled={loading === 'LOADING'}
          showSearch
        />
        <ContentSelectField
          placeholder={'학기를 선택하세요.'}
          options={selectAvailableSeasonOptions ?? []}
          disabled={!selectAvailableSeasonOptions || loading === 'LOADING'}
          value={selectedSeason}
          onChange={onChangeSelectedSeason}
          showSearch
        />
        <ContentInput
          disabled={!selectedSeason || loading === 'LOADING'}
          type="file"
          className="form-control"
          id="file"
          accept={'xlsx'}
          onChange={handleFile}
        />
        <ContentButton type={'primary'} onClick={onClickSubmitButton} disabled={loading === 'LOADING'}>
          저장하기
        </ContentButton>
      </ContentContainer>
      {selectedYear && selectedSeason && (
        <ContentContainer>
          <SpreadSheetTitleTypo>{`${selectedYear}년도 ${selectedSeason}학기 종합시간표`}</SpreadSheetTitleTypo>
          <SpreadSheetWrapper>
            {washedExcelData && <Spreadsheet data={washedExcelData} columnLabels={TABLE_COLUMN_TITLE} />}
          </SpreadSheetWrapper>
        </ContentContainer>
      )}
    </Root>
  )
}
