import { postGraduationCheck } from 'apis/graduation/postGraduationCheck'
import { Header } from 'components/Header'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [excelFilePassword, setExcelFilePassword] = useState<string>()
  const [loading, setLoading] = useState<'LOADING' | 'NONE'>('NONE')

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

    let formData = new FormData()
    formData.append('file', excelFile)
    formData.append('password', excelFilePassword)
    if (excelFile) {
      setLoading('LOADING')
      postGraduationCheck({ year: entranceYear, tech: classification }, formData)
        .then((data) => {
          setLoading('NONE')
          navigate('/result', { state: { graduationCheckData: data } })
        })
        .catch((res) => {
          alert('엑셀 파일의 비밀번호를 확인해주세요.')
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
            <ContentQuestionItemContainer>
              <ContentQuestionItemTitleTypo>excel 파일 비밀번호</ContentQuestionItemTitleTypo>
              <ContentInput
                disabled={loading === 'LOADING'}
                type={'password'}
                value={excelFilePassword}
                onChange={(e: any) => setExcelFilePassword(e.target.value)}
              />
            </ContentQuestionItemContainer>
          </ContentQuestionContainer>
          <SubmitButton type={'primary'} onClick={onClickSubmitButton} disabled={loading === 'LOADING'}>
            검사하기
          </SubmitButton>
        </ContentContainer>
      </Container>
    </Root>
  )
}
