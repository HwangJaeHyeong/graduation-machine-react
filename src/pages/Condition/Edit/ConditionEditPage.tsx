import { LectureConditionCreateModal } from 'components/LectureConditionCreateModal'
import { LectureConditionEditModal } from 'components/LectureConditionEditModal'
import { PreLectureItemCard } from 'components/PreLectureItemCard'
import { SelectCommonLectureGroupModal } from 'components/SelectCommonLectureGroupModal'
import { SelectLectureItemNameModal } from 'components/SelectLectureItemNameModal'
import { SelectPreLectureModal } from 'components/SelectPreLectureModal'
import { defaultConditionList } from 'constants/condition'
import { availableYears, AvailableYearType } from 'constants/lecture'
import { AvailableMajorType, majorList } from 'constants/major'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ConditionListType } from 'types/common'
import {
  LectureIdentificationItemType,
  LectureIdentificationListType,
  PreLectureItemType,
  PreLectureListType,
} from 'types/lecture'
import { loadConditionFromLocalStorage, saveConditionToLocalStorage } from 'utils/handleConditionLocalStorage'
import {
  ContentAddButton,
  ContentAddButtonIcon,
  ContentAddButtonTypo,
  ContentAddContainer,
  ContentButton,
  ContentCard,
  ContentCardCollapse,
  ContentCardContainer,
  ContentCardDeleteButton,
  ContentCardDeleteButtonIcon,
  ContentCardDeleteButtonTypo,
  ContentCardDeleteButtonWrapper,
  ContentCardFieldContainer,
  ContentCardTitleTypo,
  ContentCheckbox,
  ContentCheckboxContainer,
  ContentCheckboxTypo,
  ContentContainer,
  ContentInputField,
  ContentLectureConditionGroupTitleTypo,
  ContentLectureGroupContainer,
  ContentSubmitButton,
  ContentSubmitButtonTypo,
  ContentSubtitleTypo,
  ContentTitleTypo,
  HeaderContainer,
  HeaderLogoTypo,
  HeaderMenuContainer,
  HeaderMenuShareButton,
  Root,
} from './styled'

type ConditionEditPageProps = {
  className?: string
}

export const ConditionEditPage: FC<ConditionEditPageProps> = ({ className }) => {
  const { major_code: majorCode, year: selectedYear } = useParams()
  const [conditionList, setConditionList] = useState<ConditionListType>(defaultConditionList as ConditionListType)
  const [minimumCredit, setMinimumCredit] = useState<number>(130)
  const navigate = useNavigate()

  const onChangeConditionInput = (type: 'TITLE' | 'MINIMUM_GRADE', conditionIndex: number) => (e: any) => {
    if (type === 'TITLE') {
      setConditionList((prev) =>
        prev.map((conditionItem) =>
          conditionItem.id === conditionIndex ? { ...conditionItem, title: e.target.value } : conditionItem
        )
      )
      return
    }
    if (type === 'MINIMUM_GRADE') {
      let newValue = +e.target.value > 0 ? +e.target.value : 0

      setConditionList((prev) =>
        prev.map((conditionItem) =>
          conditionItem.id === conditionIndex ? { ...conditionItem, minimumCredit: newValue } : conditionItem
        )
      )
      return
    }
  }

  const onChangeConditionGroupIsEssentialCheckbox = (conditionIndex: number, conditionGroupIndex: number) => () => {
    setConditionList((prevState) =>
      prevState.map((value) =>
        value.id === conditionIndex
          ? {
              ...value,
              lectureConditionGroupList: value.lectureConditionGroupList.map((value2) =>
                value2.id === conditionGroupIndex ? { ...value2, isEssential: !value2.isEssential } : value2
              ),
            }
          : value
      )
    )
  }

  const onChangeConditionGroupTitleInput = (conditionIndex: number, conditionGroupIndex: number) => (e: any) => {
    setConditionList((prevState) =>
      prevState.map((value) =>
        value.id === conditionIndex
          ? {
              ...value,
              lectureConditionGroupList: value.lectureConditionGroupList.map((value2) =>
                value2.id === conditionGroupIndex ? { ...value2, title: e.target.value } : value2
              ),
            }
          : value
      )
    )
  }

  const handleConditionList = (type: 'ADD' | 'DELETE', conditionIndex?: number) => () => {
    if (type === 'ADD') {
      setConditionList((prev) => [
        ...prev,
        {
          id: prev.length === 0 ? 1 : prev[prev.length - 1].id + 1,
          title: '새로운 조건',
          category: 'etc',
          minimumCredit: 0,
          lectureConditionGroupList: [],
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

  const onDeleteLecture = (conditionItemId: number, lectureConditionGroupId: number, lectureId: number) => () => {
    setConditionList((prevState) => {
      return prevState.map((value) => {
        if (value.id === conditionItemId) {
          return {
            ...value,
            lectureConditionGroupList: value.lectureConditionGroupList.map((value2) =>
              value2.id === lectureConditionGroupId
                ? {
                    ...value2,
                    lectureIdentificationList: value2.lectureIdentificationList.filter(
                      (value3) => value3.id !== lectureId
                    ),
                  }
                : value2
            ),
          }
        }
        return value
      })
    })
  }

  const handleConditionGroupList =
    (type: 'ADD' | 'DELETE', conditionIndex: number, conditionGroupIndex?: number) => () => {
      if (type === 'ADD') {
        setConditionList((prev) =>
          prev.map((value) =>
            value.id === conditionIndex
              ? {
                  ...value,
                  lectureConditionGroupList: [
                    ...value.lectureConditionGroupList,
                    {
                      id:
                        value.lectureConditionGroupList.length === 0
                          ? 1
                          : value.lectureConditionGroupList[value.lectureConditionGroupList.length - 1].id + 1,
                      title: '그룹명을 입력해주세요.',
                      lectureIdentificationList: [],
                      preLectureList: [],
                      isEssential: false,
                    },
                  ],
                }
              : value
          )
        )
        return
      }
      if (type === 'DELETE') {
        console.log({ conditionGroupIndex })
        setConditionList((prev) =>
          prev.map((value, index) =>
            index === conditionIndex
              ? {
                  ...value,
                  lectureConditionGroupList: value.lectureConditionGroupList.filter(
                    (value2) => value2.id !== conditionGroupIndex
                  ),
                }
              : value
          )
        )
        return
      }
    }

  const onClickCreateConditionGroup = (conditionIndex: number) => () => {
    handleConditionGroupList('ADD', conditionIndex)()
    return
  }

  const onClickDeleteConditionGroup = (conditionIndex: number, conditionGroupIndex: number) => () => {
    handleConditionGroupList('DELETE', conditionIndex, conditionGroupIndex)()
    return
  }

  const onSelectCommonLectureGroupItem =
    (conditionIndex: number, conditionGroupIndex: number) =>
    (lectureIdentificationList: LectureIdentificationListType) => {
      lectureIdentificationList.forEach((lectureIdentificationItem) => {
        onCreateConditionGroupLectureItem(conditionIndex, conditionGroupIndex, true)(lectureIdentificationItem)()
      })
      return
    }

  const onCreateConditionGroupLectureList =
    (conditionIndex: number, conditionGroupIndex: number) =>
    (lectureIdentificationList: LectureIdentificationListType) =>
    () => {
      lectureIdentificationList.forEach((value) => {
        onCreateConditionGroupLectureItem(conditionIndex, conditionGroupIndex, true)(value)()
      })
    }

  const onCreateConditionGroupLectureItem =
    (conditionIndex: number, conditionGroupIndex: number, isGroupSelected: boolean = false) =>
    (lectureIdentificationItem: LectureIdentificationItemType) =>
    () => {
      setConditionList((prev) =>
        prev.map((value, index) =>
          index === conditionIndex
            ? {
                ...value,
                lectureConditionGroupList: value.lectureConditionGroupList.map((value2) => {
                  let isDuplicated = false

                  value.lectureConditionGroupList.forEach(
                    (item) =>
                      item.id === conditionGroupIndex &&
                      item.lectureIdentificationList.forEach((value) => {
                        if (
                          value.code === lectureIdentificationItem.code &&
                          value.year === lectureIdentificationItem.year &&
                          value.season === lectureIdentificationItem.season
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
                    return value2
                  }

                  return value2.id === conditionGroupIndex
                    ? {
                        ...value2,
                        lectureIdentificationList: [
                          ...value2.lectureIdentificationList,
                          {
                            ...lectureIdentificationItem,
                            id:
                              value2.lectureIdentificationList.length === 0
                                ? 1
                                : value2.lectureIdentificationList[value2.lectureIdentificationList.length - 1].id + 1,
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
                    : value2
                }),
              }
            : value
        )
      )

      return
    }

  const onCreatePreLectureItem = (conditionId: number, groupId: number) => (preLectureItem: PreLectureItemType) => {
    let duplicateCheck = false

    conditionList.forEach((conditionItem) => {
      if (conditionItem.id === conditionId) {
        conditionItem.lectureConditionGroupList.forEach((groupItem) => {
          groupItem.preLectureList &&
            groupItem.preLectureList.forEach((prevPreLectureItem) => {
              if (
                prevPreLectureItem.conditionId === preLectureItem.conditionId &&
                prevPreLectureItem.groupId === preLectureItem.groupId
              ) {
                duplicateCheck = true
              }
            })
        })
      }
    })
    if (duplicateCheck) {
      alert('이미 존재하는 선이수 강의입니다.')
      return
    }

    const newPreLectureList = (prevPreLectureList?: PreLectureListType) =>
      prevPreLectureList ? [...prevPreLectureList, preLectureItem] : [preLectureItem]

    setConditionList((prevConditionList) => {
      return prevConditionList.map((conditionItem) =>
        conditionItem.id === conditionId
          ? {
              ...conditionItem,
              lectureConditionGroupList: conditionItem.lectureConditionGroupList.map((groupItem) =>
                groupItem.id === groupId
                  ? { ...groupItem, preLectureList: newPreLectureList(groupItem.preLectureList) }
                  : groupItem
              ),
            }
          : conditionItem
      )
    })
  }

  const onDeletePreLectureItem = (conditionId: number, groupId: number) => (preLectureItem: PreLectureItemType) => {
    setConditionList((prevConditionList) => {
      return prevConditionList.map((conditionItem) =>
        conditionItem.id === conditionId
          ? {
              ...conditionItem,
              lectureConditionGroupList: conditionItem.lectureConditionGroupList.map((groupItem) =>
                groupItem.id === groupId
                  ? {
                      ...groupItem,
                      preLectureList: groupItem.preLectureList.filter(
                        (prevPreLectureItem) =>
                          !(
                            prevPreLectureItem.groupId === preLectureItem.groupId &&
                            prevPreLectureItem.conditionId === preLectureItem.conditionId
                          )
                      ),
                    }
                  : groupItem
              ),
            }
          : conditionItem
      )
    })
  }

  const majorItem = majorList.filter((majorItem) => majorItem.code === majorCode)[0]
  const washedSelectedYear = selectedYear ? +selectedYear : 0

  const onClickSubmitButton = () => {
    if (majorItem && washedSelectedYear) {
      saveConditionToLocalStorage(
        majorItem.code as AvailableMajorType,
        washedSelectedYear as AvailableYearType,
        conditionList
      )
      navigate(0)
    }
  }

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

  if (!majorItem && availableYears.includes(washedSelectedYear)) {
    return <div>잘못된 접근입니다.</div>
  }

  return (
    <Root className={className}>
      <HeaderContainer>
        <HeaderLogoTypo>
          {washedSelectedYear}학번 {majorItem.label} 졸업 판정기
        </HeaderLogoTypo>
        <HeaderMenuContainer>
          <HeaderMenuShareButton />
        </HeaderMenuContainer>
      </HeaderContainer>
      <ContentContainer>
        <ContentTitleTypo>졸업 이수 조건</ContentTitleTypo>
        <ContentCardContainer>
          {conditionList.map((conditionItem, index) => (
            <ContentCard key={`content_card_${conditionItem.id}`}>
              <ContentCardCollapse>
                <ContentCardCollapse.Panel
                  key={`content_card_${conditionItem.id}_1`}
                  header={
                    <ContentCardTitleTypo>
                      {conditionItem.title
                        ? `${conditionItem.title} (최소 ${conditionItem.minimumCredit}학점)`
                        : `조건 ${conditionItem.id + 1}`}{' '}
                    </ContentCardTitleTypo>
                  }
                >
                  <ContentCardFieldContainer>
                    {conditionItem.category === 'etc' && (
                      <ContentInputField
                        addonBefore="제목"
                        placeholder="제목을 입력해주세요."
                        value={conditionItem.title}
                        onChange={onChangeConditionInput('TITLE', conditionItem.id)}
                      />
                    )}
                    <ContentInputField
                      type="number"
                      min={1}
                      addonBefore="최소 학점"
                      placeholder="최소 학점을 입력해주세요."
                      value={conditionItem.minimumCredit}
                      onChange={onChangeConditionInput('MINIMUM_GRADE', conditionItem.id)}
                    />

                    {conditionItem?.lectureConditionGroupList &&
                      conditionItem.lectureConditionGroupList.map((lectureConditionGroupItem) => (
                        <ContentCardCollapse key={`condition_item_${conditionItem.id}_${lectureConditionGroupItem.id}`}>
                          <ContentCardCollapse.Panel
                            header={
                              <ContentLectureConditionGroupTitleTypo>
                                {`${lectureConditionGroupItem.title} ${
                                  lectureConditionGroupItem.isEssential ? `(필수)` : ``
                                }`}
                              </ContentLectureConditionGroupTitleTypo>
                            }
                            key={`condition_item_${conditionItem.id}_${lectureConditionGroupItem.id}_1`}
                          >
                            <ContentLectureGroupContainer>
                              <ContentInputField
                                addonBefore="제목"
                                placeholder="제목을 입력해주세요."
                                value={lectureConditionGroupItem.title}
                                onChange={onChangeConditionGroupTitleInput(
                                  conditionItem.id,
                                  lectureConditionGroupItem.id
                                )}
                              />
                              <ContentSubtitleTypo>선이수 강의</ContentSubtitleTypo>
                              {lectureConditionGroupItem?.preLectureList &&
                                lectureConditionGroupItem.preLectureList.map((preLectureItem) => (
                                  <PreLectureItemCard
                                    onDelete={onDeletePreLectureItem(conditionItem.id, lectureConditionGroupItem.id)}
                                    conditionList={conditionList}
                                    preLectureItem={preLectureItem}
                                    key={`pre_lecture_item_card_${preLectureItem.conditionId}_${preLectureItem.groupId}`}
                                  />
                                ))}
                              <SelectPreLectureModal
                                conditionId={conditionItem.id}
                                groupId={lectureConditionGroupItem.id}
                                conditionList={conditionList}
                                onCreate={onCreatePreLectureItem(conditionItem.id, lectureConditionGroupItem.id)}
                              />
                              <ContentSubtitleTypo>개설 강의 내역</ContentSubtitleTypo>
                              {lectureConditionGroupItem.lectureIdentificationList.map((lectureIdentificationItem) => (
                                <LectureConditionEditModal
                                  lectureIdentificationItem={lectureIdentificationItem}
                                  onDelete={onDeleteLecture(
                                    conditionItem.id,
                                    lectureConditionGroupItem.id,
                                    lectureIdentificationItem.id
                                  )}
                                  key={`condition_item_${conditionItem.id}_${lectureConditionGroupItem.id}_${lectureIdentificationItem.year}_${lectureIdentificationItem.season}_${lectureIdentificationItem.code}`}
                                />
                              ))}
                              <ContentCheckboxContainer
                                onClick={onChangeConditionGroupIsEssentialCheckbox(
                                  conditionItem.id,
                                  lectureConditionGroupItem.id
                                )}
                              >
                                <ContentCheckbox type={'checkbox'} checked={lectureConditionGroupItem.isEssential} />{' '}
                                <ContentCheckboxTypo>필수</ContentCheckboxTypo>
                              </ContentCheckboxContainer>
                              <SelectCommonLectureGroupModal
                                onSelect={onSelectCommonLectureGroupItem(
                                  conditionItem.id,
                                  lectureConditionGroupItem.id
                                )}
                              />
                              <SelectLectureItemNameModal
                                onCreate={onCreateConditionGroupLectureList(
                                  conditionItem.id,
                                  lectureConditionGroupItem.id
                                )}
                              />
                              <LectureConditionCreateModal
                                onCreate={onCreateConditionGroupLectureItem(
                                  conditionItem.id,
                                  lectureConditionGroupItem.id
                                )}
                              />
                              <ContentCardDeleteButton
                                type={'primary'}
                                className={className}
                                onClick={onClickDeleteConditionGroup(conditionItem.id, lectureConditionGroupItem.id)}
                              >
                                <ContentCardDeleteButtonTypo>그룹 삭제</ContentCardDeleteButtonTypo>
                                <ContentCardDeleteButtonIcon />
                              </ContentCardDeleteButton>
                            </ContentLectureGroupContainer>
                          </ContentCardCollapse.Panel>
                        </ContentCardCollapse>
                      ))}

                    <ContentButton
                      type={'primary'}
                      className={className}
                      onClick={onClickCreateConditionGroup(conditionItem.id)}
                    >
                      그룹 추가
                      <ContentAddButtonIcon />
                    </ContentButton>
                  </ContentCardFieldContainer>
                  {conditionItem.category === 'etc' && (
                    <ContentCardDeleteButtonWrapper>
                      <ContentCardDeleteButton type={'primary'} onClick={onClickDeleteConditionButton(index)}>
                        <ContentCardDeleteButtonTypo>조건 삭제</ContentCardDeleteButtonTypo>
                        <ContentCardDeleteButtonIcon />
                      </ContentCardDeleteButton>
                    </ContentCardDeleteButtonWrapper>
                  )}
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
      <ContentContainer>
        <ContentTitleTypo>기타</ContentTitleTypo>
        <ContentInputField
          type={'number'}
          min={1}
          addonBefore="최소 이수 학점"
          placeholder="최소 이수 학점을 입력해주세요."
          value={minimumCredit}
          onChange={(e: any) => setMinimumCredit(e.target.value)}
        />
        <ContentSubmitButton onClick={onClickSubmitButton}>
          <ContentSubmitButtonTypo>저장하기</ContentSubmitButtonTypo>
        </ContentSubmitButton>
      </ContentContainer>
    </Root>
  )
}
