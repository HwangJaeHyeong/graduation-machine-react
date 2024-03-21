import { FC, useState } from 'react'

import * as XLSX from 'xlsx/xlsx.mjs'
import { ContentContainer, ContentInput, HeaderContainer, HeaderLogoTypo, Root } from './styled'

type LectureExcelPageProps = {
  className?: string
}

export const LectureExcelPage: FC<LectureExcelPageProps> = ({ className }) => {
  const [excelData, setExcelData] = useState<any>([])

  const handleFile = (e: any) => {
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

      console.log({ data })
      setExcelData(() => {
        let newData = data

        return [...newData]
      })
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }

  console.log({ excelData })

  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>종합 시간표 엑셀 입력하기</HeaderLogoTypo>
      </HeaderContainer>
      <ContentContainer>
        <ContentInput type="file" className="form-control" id="file" accept={'xlsx'} onChange={handleFile} />
      </ContentContainer>
    </Root>
  )
}
