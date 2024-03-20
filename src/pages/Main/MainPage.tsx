import { LectureConditionCreateModal } from 'components/LectureConditionCreateModal'
import { LectureConditionEditModal } from 'components/LectureConditionEditModal'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConditionListType } from 'types/common'
import {
  ContentAddButton,
  ContentAddButtonIcon,
  ContentAddButtonTypo,
  ContentAddContainer,
  ContentCard,
  ContentCardCollapse,
  ContentCardContainer,
  ContentCardDeleteButton,
  ContentCardDeleteButtonIcon,
  ContentCardDeleteButtonTypo,
  ContentCardFieldContainer,
  ContentCardTitleTypo,
  ContentContainer,
  ContentInputField,
  ContentSubmitButton,
  ContentSubmitButtonTypo,
  HeaderContainer,
  HeaderLogoTypo,
  HeaderMenuContainer,
  HeaderMenuShareButton,
  Root,
} from './styled'

type MainPageProps = {
  className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
  const [conditionList, setConditionList] = useState<ConditionListType>([
    {
      id: 0,
      title: '영어 강의',
      category: 'english',
      lectureIdentificationList: [],
    },
  ])
  const navigate = useNavigate()

  const handleConditionList = (type: 'ADD' | 'DELETE', conditionIndex?: number) => () => {
    if (type === 'ADD') {
      setConditionList((prev) => [
        ...prev,
        {
          id: prev.length === 0 ? 1 : prev[prev.length - 1].id + 1,
          title: '새로운 조건',
          category: 'etc',
          lectureIdentificationList: [],
        },
      ])
      return
    }
    if (type === 'DELETE') {
      setConditionList((prev) => prev.filter((_, index) => index !== conditionIndex))
      return
    }
  }

  const onClickDeleteConditionButton = (index: number) => () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      handleConditionList('DELETE', index)()
      return
    }
    return
  }

  const onDeleteLecture = (conditionItemId: number, lectureConditionItemId: number) => () => {
    setConditionList((prevState) => {
      return prevState.map((value) => {
        if (value.id === conditionItemId) {
          return {
            ...value,
            lectureIdentificationList: value.lectureIdentificationList.filter(
              (value2) => value2.id !== lectureConditionItemId
            ),
          }
        }
        return value
      })
    })
  }

  const onClickSubmitButton = () => {
    navigate('/result')
  }

  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>졸업 판정기</HeaderLogoTypo>
        <HeaderMenuContainer>
          <HeaderMenuShareButton />
        </HeaderMenuContainer>
      </HeaderContainer>
      <ContentContainer>
        <ContentCardContainer>
          {conditionList.map((conditionItem, index) => (
            <ContentCard key={`content_card_${index}`}>
              <ContentCardCollapse>
                <ContentCardCollapse.Panel
                  key={`content_card_${index}_1`}
                  header={<ContentCardTitleTypo>조건 {index + 1}</ContentCardTitleTypo>}
                >
                  <ContentCardFieldContainer>
                    <ContentInputField addonBefore="제목" placeholder="제목을 입력해주세요." />
                    <ContentInputField addonBefore="메모" placeholder="메모를 입력해주세요.(선택)" />

                    {conditionItem?.lectureIdentificationList &&
                      conditionItem.lectureIdentificationList.map((lectureIdentificationItem) => (
                        <LectureConditionEditModal
                          onDelete={onDeleteLecture(conditionItem.id, lectureIdentificationItem.id)}
                          key={`condition_item_${index}_${lectureIdentificationItem.id}`}
                        />
                      ))}
                    <LectureConditionCreateModal />
                  </ContentCardFieldContainer>
                  <ContentCardDeleteButton type={'primary'} onClick={onClickDeleteConditionButton(index)}>
                    <ContentCardDeleteButtonTypo>조건 삭제</ContentCardDeleteButtonTypo>
                    <ContentCardDeleteButtonIcon />
                  </ContentCardDeleteButton>
                </ContentCardCollapse.Panel>
              </ContentCardCollapse>
            </ContentCard>
          ))}
        </ContentCardContainer>
        <ContentAddContainer>
          <ContentAddButton type={'primary'} onClick={handleConditionList('ADD')}>
            <ContentAddButtonTypo>조건 추가</ContentAddButtonTypo>
            <ContentAddButtonIcon />
          </ContentAddButton>
        </ContentAddContainer>
        <ContentSubmitButton onClick={onClickSubmitButton}>
          <ContentSubmitButtonTypo>저장하기</ContentSubmitButtonTypo>
        </ContentSubmitButton>
      </ContentContainer>
    </Root>
  )
}
