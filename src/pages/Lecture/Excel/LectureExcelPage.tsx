import { FC, useState } from 'react'

import { ContentContainer, ContentInput, HeaderContainer, HeaderLogoTypo, Root } from './styled'
import * as XLSX from 'xlsx/xlsx.mjs'

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
      setExcelData((prev: any) => {
        // let prevPhoneNumberList = prev.filter((value: any) => value[4]?.value).map((value: any) => value[4].value)

        let newData = [
          ...prev,
          ...data
            // .filter((value: any) => !prevPhoneNumberList.includes(value[4]))
            .filter((value: any) => value[0])
            .filter((_value: any, index: number) => index !== 0)
            .map((value: string[]) => value.map((value2) => ({ value: value2 }))),
        ]

        newData = newData.map((value: any) => {
          if (!value[5]) {
            return value
          }
          let a = newData.filter((value2: any) => value2[5].value === value[5].value)
          if (a.length > 1) {
            a = a[0]
            console.log({ value, a })
            for (let i = 0; i < 13; i++) {
              if (i === 3 || i === 4 || i === 5 || i === 6 || i === 7) {
                continue
              }
              if (a[i]?.value && value[i]?.value && a[i]?.value !== value[i]?.value) {
                value[i] = { value: `${a[i].value}, ${value[i].value}` }
              } else if (value[i]?.value) {
                value[i] = { value: `${value[i].value}` }
              } else if (a[i]?.value) {
                value[i] = { value: `${a[i].value}` }
              }
            }
          }

          return [...value]
        })

        newData = newData.filter((value: any, index: number) => {
          let check = false
          newData.forEach((value2: any, index2: number) => {
            if (value2[4]?.value && value[4]?.value && value2[4].value === value[4].value && index !== index2) {
              if (index < index2) {
                check = true
              }
            }
          })
          return !check
        })

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
