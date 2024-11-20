import { getGraduations } from 'apis/conditions/getGraduations'
import { postGraduationCheck } from 'apis/graduation/postGraduationCheck'
import { Header } from 'components/Header'
import { FC, useEffect, useState } from 'react'
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

type AdminTestPageProps = {
  className?: string
}

type ClassificationType = '일반' | '심화'
type ConditionOptionType = { year: number; tech: ClassificationType }

export const AdminTestPage: FC<AdminTestPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [conditionOptions, setConditionOptions] = useState<ConditionOptionType[]>([])
  const [condition, setCondition] = useState<ConditionOptionType>()
  const [conditionOptionValue, setConditionOptionValue] = useState<string>()

  const [excelFile, setExcelFile] = useState<any>()
  const [excelFilePassword, setExcelFilePassword] = useState<string>()
  const [loading, setLoading] = useState<'LOADING' | 'NONE'>('NONE')

  const handleFile = (e: any) => {
    setLoading('LOADING')
    const files = e.target.files
    const file = files
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
    if (!condition) {
      alert('입학 연도/구분을 선택해주세요.')
      return
    }

    let formData = new FormData()
    if (excelFile) {
      console.log(excelFile)
      Array.from(excelFile).forEach((value: any) => {
        formData.append('file', value)
      })
    }
    formData.append('password', excelFilePassword)
    if (excelFile) {
      setLoading('LOADING')
      postGraduationCheck({ year: condition?.year, tech: condition?.tech }, formData)
        .then((data) => {
          setLoading('NONE')
          navigate('/admin/test/result', { state: { graduationCheckData: data.data } })
        })
        .catch((res) => {
          alert('엑셀 파일의 비밀번호를 확인해주세요.')
        })
    }
  }

  const 졸업_요건_OPTIONS = (() => {
    return conditionOptions.map((conditionOption) => ({
      value: JSON.stringify(conditionOption),
      label: `${conditionOption.year}학번 ${conditionOption.tech}과정`,
    }))
  })()

  useEffect(() => {
    getGraduations().then((res) => {
      setConditionOptions(res.data)
    })
  }, [])

  return (
    <Root className={className}>
      <Header type="ADMIN" />
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
              <ContentQuestionItemTitleTypo>입학 연도/전공 구분</ContentQuestionItemTitleTypo>
              <ContentQuestionItemSelect
                options={졸업_요건_OPTIONS}
                value={conditionOptionValue}
                onChange={(value: any) => {
                  setConditionOptionValue(value)
                  setCondition(JSON.parse(value) as ConditionOptionType)
                }}
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
                multiple={true}
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
