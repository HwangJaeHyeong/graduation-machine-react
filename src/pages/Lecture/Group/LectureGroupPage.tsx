import { LectureConditionCreateModal } from 'components/LectureConditionCreateModal'
import { LectureConditionEditModal } from 'components/LectureConditionEditModal'
import { SelectLectureItemCodeModal } from 'components/SelectLectureItemCodeModal'
import { SelectLectureItemNameModal } from 'components/SelectLectureItemNameModal'
import { DEFAULT_LECTURE_GROUP_LIST } from 'constants/lectureGroup'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CommonLectureGroupItemType,
  CommonLectureGroupListType,
  LectureIdentificationItemType,
  LectureIdentificationListType,
} from 'types/lecture'
import {
  loadCommonLectureGroupFromLocalStorage,
  saveCommonLectureGroupToLocalStorage,
} from 'utils/handleCommonLectureGroupLocalStorage'
import {
  ContentAddButton,
  ContentAddButtonIcon,
  ContentAddButtonTypo,
  ContentAddContainer,
  ContentCard,
  ContentCardCollapse,
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
  Root,
} from './styled'

type LectureGroupPageProps = {
  className?: string
}

const generateDefaultCommonLectureGroupItem = (id: number): CommonLectureGroupItemType => {
  return {
    id,
    title: `그룹 ${id}`,
    lectureIdentificationList: [],
  }
}

export const LectureGroupPage: FC<LectureGroupPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [commonLectureGroupList, setCommonLectureGroupList] = useState<CommonLectureGroupListType>(
    DEFAULT_LECTURE_GROUP_LIST as CommonLectureGroupListType
  )

  const onChangeCommonLectureGroupTitle = (commonLectureGroupId: number) => (e: any) => {
    setCommonLectureGroupList((prev) =>
      prev.map((value) => (value.id === commonLectureGroupId ? { ...value, title: e.target.value } : value))
    )
  }

  const handleCommonLectureGroupList = (type: 'ADD' | 'DELETE', id?: number) => () => {
    if (type === 'ADD') {
      setCommonLectureGroupList((prev) => {
        const newCommonLectureGroupId = prev[prev.length - 1].id + 1
        return [...prev, generateDefaultCommonLectureGroupItem(newCommonLectureGroupId)]
      })
      return
    }
    if (type === 'DELETE') {
      setCommonLectureGroupList((prev) => prev.filter((item) => item.id !== id))
      return
    }
  }

  const onCreateCommonConditionGroupLectureList =
    (commonLectureGroupId: number) => (lectureIdentificationList: LectureIdentificationListType) => () => {
      lectureIdentificationList.forEach((value) => {
        onCreateCommonConditionGroupLectureItem(commonLectureGroupId, true)(value)()
      })
    }

  const onCreateCommonConditionGroupLectureItem =
    (commonLectureGroupId: number, isGroupSelected: boolean = false) =>
    (lectureIdentificationItem: LectureIdentificationItemType) =>
    () => {
      setCommonLectureGroupList((prev) => {
        const newCommonLectureGroupLectureItem = lectureIdentificationItem
        let isDuplicated = false

        prev.length >= 1 &&
          prev.forEach(
            (item) =>
              item.id === commonLectureGroupId &&
              item.lectureIdentificationList.forEach((value) => {
                if (
                  value.code === newCommonLectureGroupLectureItem.code &&
                  value.year === newCommonLectureGroupLectureItem.year &&
                  value.season === newCommonLectureGroupLectureItem.season
                ) {
                  isDuplicated = true
                  if (!isGroupSelected) {
                    alert('이미 동일한 강의가 포함되어 있습니다.')
                  }
                  return
                }
              })
          )

        if (isDuplicated) {
          return prev
        }

        return prev.length >= 1
          ? prev.map((item) =>
              item.id === commonLectureGroupId
                ? {
                    ...item,
                    lectureIdentificationList: [
                      ...item.lectureIdentificationList,
                      {
                        ...newCommonLectureGroupLectureItem,
                        id: item.lectureIdentificationList[item.lectureIdentificationList.length - 1]
                          ? item.lectureIdentificationList[item.lectureIdentificationList.length - 1].id + 1
                          : 0,
                      },
                    ].sort((a, b) => {
                      if (a.year > b.year) {
                        return 1
                      }
                      if (a.year < b.year) {
                        return -1
                      }
                      if (a.season > b.season) {
                        return 1
                      }
                      if (a.season < b.season) {
                        return -1
                      }
                      if (a.code > b.code) {
                        return 1
                      }
                      if (a.code < b.code) {
                        return -1
                      }
                      return 1
                    }),
                  }
                : item
            )
          : prev
      })
      return
    }

  const onDeleteCommonConditionGroupLectureItem = (commonLectureGroupId: number, lectureItemId: number) => () => {
    setCommonLectureGroupList((prev) =>
      prev.map((value) =>
        value.id === commonLectureGroupId
          ? {
              ...value,
              lectureIdentificationList: value.lectureIdentificationList.filter(
                (value2) => value2.id !== lectureItemId
              ),
            }
          : value
      )
    )
  }

  const onClickSubmitButton = () => {
    saveCommonLectureGroupToLocalStorage(
      commonLectureGroupList
        .sort((a, b) => (a.title > b.title ? 1 : -1))
        .map((value, index) => ({ ...value, id: index }))
    )
    alert('저장이 완료되었습니다.')
    navigate(0)
    return
  }

  useEffect(() => {
    const loadedData = loadCommonLectureGroupFromLocalStorage()
    if (loadedData && loadedData.length !== 0) {
      setCommonLectureGroupList(loadedData)
      return
    }
  }, [loadCommonLectureGroupFromLocalStorage])

  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>공통 강의 그룹</HeaderLogoTypo>
      </HeaderContainer>
      <ContentContainer>
        {commonLectureGroupList &&
          commonLectureGroupList.map((commonLectureGroupItem) => (
            <ContentCard key={`content_card_${commonLectureGroupItem.id}`}>
              <ContentCardCollapse>
                <ContentCardCollapse.Panel
                  key={`content_group_card`}
                  header={<ContentCardTitleTypo>{`${commonLectureGroupItem.title}`}</ContentCardTitleTypo>}
                >
                  <ContentCardFieldContainer>
                    <ContentInputField
                      addonBefore="제목"
                      placeholder="제목을 입력해주세요."
                      value={commonLectureGroupItem.title}
                      onChange={onChangeCommonLectureGroupTitle(commonLectureGroupItem.id)}
                    />

                    {commonLectureGroupItem.lectureIdentificationList.map((lectureIdentificationItem) => (
                      <LectureConditionEditModal
                        lectureIdentificationItem={lectureIdentificationItem}
                        onDelete={onDeleteCommonConditionGroupLectureItem(
                          commonLectureGroupItem.id,
                          lectureIdentificationItem.id
                        )}
                        key={`condition_item_${commonLectureGroupItem.id}_${lectureIdentificationItem.year}_${lectureIdentificationItem.season}_${lectureIdentificationItem.code}`}
                      />
                    ))}
                    <SelectLectureItemCodeModal
                      onCreate={onCreateCommonConditionGroupLectureList(commonLectureGroupItem.id)}
                    />
                    <SelectLectureItemNameModal
                      onCreate={onCreateCommonConditionGroupLectureList(commonLectureGroupItem.id)}
                    />
                    <LectureConditionCreateModal
                      onCreate={onCreateCommonConditionGroupLectureItem(commonLectureGroupItem.id)}
                    />
                    {commonLectureGroupList.length > 1 && (
                      <ContentCardDeleteButton
                        type={'primary'}
                        className={className}
                        onClick={handleCommonLectureGroupList('DELETE', commonLectureGroupItem.id)}
                      >
                        <ContentCardDeleteButtonTypo>그룹 삭제</ContentCardDeleteButtonTypo>
                        <ContentCardDeleteButtonIcon />
                      </ContentCardDeleteButton>
                    )}
                  </ContentCardFieldContainer>
                </ContentCardCollapse.Panel>
              </ContentCardCollapse>
            </ContentCard>
          ))}
        <ContentAddContainer>
          <ContentAddButton type={'primary'} onClick={handleCommonLectureGroupList('ADD')}>
            <ContentAddButtonTypo>그룹 추가</ContentAddButtonTypo>
            <ContentAddButtonIcon />
          </ContentAddButton>
          <ContentSubmitButton onClick={onClickSubmitButton}>
            <ContentSubmitButtonTypo>저장하기</ContentSubmitButtonTypo>
          </ContentSubmitButton>
        </ContentAddContainer>
      </ContentContainer>
    </Root>
  )
}
