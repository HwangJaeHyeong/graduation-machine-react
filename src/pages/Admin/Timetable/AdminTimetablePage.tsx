import { postTimetable } from 'apis/timetable/postTimetable'
import { Header } from 'components/Header'
import { FC, useState } from 'react'
import {
  Container,
  ContentButton,
  ContentContainer,
  ContentExcelContainer,
  ContentExcelTypo,
  ContentInput,
  ContentSelect,
  Root,
} from './styled'

type AdminTimetablePageProps = {
  className?: string
}

type SeasonType = '1' | '2' | 'winter' | 'summer'

export const AdminTimetablePage: FC<AdminTimetablePageProps> = ({ className }) => {
  const [year, setYear] = useState<number>()
  const [season, setSeason] = useState<SeasonType>()
  const [loading, setLoading] = useState<'LOADING' | 'NONE'>('NONE')
  const [excelFile, setExcelFile] = useState<any>()
  const [excelFilePassword, setExcelFilePassword] = useState<string>()

  const handleFile = (e: any) => {
    setLoading('LOADING')
    const files = e.target.files
    if (!(files || files[0])) {
      return
    }
    const file = files[0]
    setExcelFile(file)
    setLoading('NONE')
  }

  const onClickSubmitButton = () => {
    // navigate('/result', { state: { classification, entranceYear, excelLectureList } })

    if (!excelFile) {
      alert('성적표 엑셀 파일을 입력해주세요.')
      return
    }

    if (!excelFilePassword) {
      alert('성적표 엑셀 파일 비밀번호를 입력해주세요.')
      return
    }

    if (!year) {
      alert('연도를 입력해주세요.')
      return
    }

    if (!season) {
      alert('학기를 선택해주세요.')
      return
    }

    let formData = new FormData()
    formData.append('file', excelFile)
    formData.append('password', excelFilePassword)
    formData.append('year', `${year}`)
    formData.append('season', `${season}`)

    if (excelFile) {
      setLoading('LOADING')
      postTimetable(formData)
        .then((data) => {
          setLoading('NONE')
          alert('강의 추가가 완료되었습니다.')
        })
        .catch((res) => {
          alert('엑셀 파일의 비밀번호를 확인해주세요.')
        })
    }
  }

  return (
    <Root className={className}>
      <Header type={'ADMIN'} />
      <Container>
        <ContentContainer>
          <ContentExcelContainer>
            <ContentExcelTypo>년도</ContentExcelTypo>
            <ContentInput
              disabled={loading === 'LOADING'}
              type="text"
              value={year}
              onChange={(e: any) => setYear(e.target.value)}
            />
          </ContentExcelContainer>
          <ContentExcelContainer>
            <ContentExcelTypo>학기</ContentExcelTypo>
            <ContentSelect
              style={{ width: '100%' }}
              placeholder={'학기를 선택해주세요.'}
              disabled={loading === 'LOADING'}
              options={[
                { value: '1', label: '1학기' },
                { value: 'summer', label: '여름학기' },
                { value: '2', label: '2학기' },
                { value: 'winter', label: '겨울학기' },
              ]}
              onChange={(value: any) => setSeason(value)}
            />
          </ContentExcelContainer>
          <ContentExcelContainer>
            <ContentExcelTypo>시간표 엑셀 파일 추가</ContentExcelTypo>
            <ContentInput
              disabled={loading === 'LOADING'}
              type="file"
              className="form-control"
              id="file"
              accept={'xlsx'}
              onChange={handleFile}
            />
          </ContentExcelContainer>

          <ContentExcelContainer>
            <ContentExcelTypo>excel 파일 비밀번호</ContentExcelTypo>
            <ContentInput
              disabled={loading === 'LOADING'}
              type={'password'}
              value={excelFilePassword}
              onChange={(e: any) => setExcelFilePassword(e.target.value)}
            />
          </ContentExcelContainer>
          <ContentButton type={'primary'} onClick={onClickSubmitButton}>
            제출하기
          </ContentButton>
        </ContentContainer>
      </Container>
    </Root>
  )
}
