import { Spin } from 'antd'
import { deleteGroups } from 'apis/conditions/deleteGroups'
import { getIdentifications } from 'apis/conditions/getIdentifications'
import { getPreGroups } from 'apis/conditions/getPreGroups'
import { patchGroups } from 'apis/conditions/patchGroups'
import { filterOptionList, preLectureGroupFilterOptionList } from 'constants/common'
import { FC, useEffect, useState } from 'react'
import { FilterOptionType, PreLectureGroupFilterOptionType } from 'types/common'
import { LectureIdentificationListType } from 'types/lecture'
import { LectureGroupItemType, PreLectureGroupListType } from '../../type'
import { LectureIdentificationAddModal } from '../LectureIdentificationAddModal'
import { LectureIdentificationCard } from '../LectureIdentificationCard'
import { PreLectureGroupAddModal } from '../PreLectureGroupAddModal'
import { PreLectureGroupCard } from '../PreLectureGroupCard'
import {
  CardCollapse,
  CardCollapsePanel,
  CardTitleTypo,
  ContentButton,
  ContentContainer,
  ContentDeleteButtonIcon,
  ContentInput,
  ContentIsEssentialCheckbox,
  ContentIsEssentialContainer,
  ContentLectureContainer,
  ContentTitleContainer,
  ContentTitleFilterSelect,
  ContentTitleFilterSelectContainer,
  ContentTitleFilterSelectTypo,
  ContentTitleTypo,
  ContentTypo,
  Root,
} from './styled'

type LectureGroupCardProps = {
  className?: string
  updateLectureGroupList: () => void
  conditionId: number
} & LectureGroupItemType

export const LectureGroupCard: FC<LectureGroupCardProps> = ({
  className,
  id,
  name: defaultName,
  isEssential: defaultIsEssential,
  conditionId,
  updateLectureGroupList,
}) => {
  const [preLectureGroupList, setPreLectureGroupList] = useState<PreLectureGroupListType>([])
  const [lectureIdentificationList, setLectureIdentificationList] = useState<LectureIdentificationListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [name, setName] = useState<string>(defaultName)
  const [isEssential, setIsEssential] = useState<boolean>(defaultIsEssential)
  const [editable, setEditable] = useState<boolean>(false)
  const [preLectureGroupFilterOption, setPreLectureGroupFilterOption] =
    useState<PreLectureGroupFilterOptionType>('연도 dsc')
  const [filterOption, setFilterOption] = useState<FilterOptionType>('연도 dsc')

  const updatePreLectureGroupList = () => {
    getPreGroups({ id }).then((res) => {
      setPreLectureGroupList(res.data.map((value) => ({ ...value, year: `${value.year}` })))
    })
  }

  const updateLectureIdentificationList = () => {
    getIdentifications({ id }).then((res) => {
      setLectureIdentificationList(res.data)
    })
  }

  const onClickDeleteButton = () => {
    if (confirm('정말로 그룹을 삭제하시겠습니까?')) {
      deleteGroups({ conditionId, groupId: id }).then((res) => {
        if (res.success) {
          updateLectureGroupList()
        }
      })
    }
  }

  const onClickEditButton = () => {
    setEditable((prev) => {
      if (prev) {
        patchGroups({ conditionId: conditionId, groupId: id, name, isEssential }).then((res) => {
          if (res.success) {
            updateLectureGroupList()
          }
        })
      }
      return !prev
    })
  }

  const filteredLectureIdentificationList = (() => {
    if (filterOption === '강의명 dsc') {
      return lectureIdentificationList.sort((a, b) => b.name.localeCompare(a.name))
    }
    if (filterOption === '강의명 asc') {
      return lectureIdentificationList.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (filterOption === '학수번호 dsc') {
      return lectureIdentificationList.sort((a, b) => b.code.localeCompare(a.code))
    }
    if (filterOption === '학수번호 asc') {
      return lectureIdentificationList.sort((a, b) => a.code.localeCompare(b.code))
    }
    if (filterOption === '연도 dsc') {
      return lectureIdentificationList.sort((a: any, b: any) => b.year - a.year)
    }
    if (filterOption === '연도 asc') {
      return lectureIdentificationList.sort((a: any, b: any) => a.year - b.year)
    }
    if (filterOption === '학기 dsc') {
      return lectureIdentificationList.sort((a: any, b: any) => b.season - a.season)
    }
    return lectureIdentificationList.sort((a: any, b: any) => a.season - b.season)
  })()

  const filteredPreLectureGroupList = (() => {
    if (preLectureGroupFilterOption === '연도 dsc') {
      return preLectureGroupList.sort((a, b) => b.year.localeCompare(a.year))
    }
    if (preLectureGroupFilterOption === '연도 asc') {
      return preLectureGroupList.sort((a, b) => a.year.localeCompare(b.year))
    }
    if (preLectureGroupFilterOption === '이름 dsc') {
      return preLectureGroupList.sort((a, b) => b.name.localeCompare(a.name))
    }
    return preLectureGroupList.sort((a, b) => a.name.localeCompare(b.name))
  })()

  useEffect(() => {
    updatePreLectureGroupList()
    updateLectureIdentificationList()
  }, [])

  return (
    <Root className={className} onClick={() => setIsOpened(true)}>
      <CardCollapse>
        <CardCollapsePanel
          header={<CardTitleTypo>{`${defaultName} ${defaultIsEssential ? '(필수)' : ''}`}</CardTitleTypo>}
          key={`lecture_condition_card_${id}`}
        >
          <ContentContainer>
            <ContentInput
              addonBefore={'그룹명'}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              disabled={!editable}
            />
            <ContentIsEssentialContainer onClick={() => setIsEssential((prev) => !prev)}>
              <ContentIsEssentialCheckbox checked={isEssential} disabled={!editable} />
              <ContentTypo>필수 여부</ContentTypo>
            </ContentIsEssentialContainer>
            <ContentButton type={'primary'} onClick={onClickEditButton}>
              {editable ? '수정 완료' : '그룹 수정'}
            </ContentButton>
            <ContentTitleContainer>
              <ContentTitleTypo>선이수 강의</ContentTitleTypo>
              <ContentTitleFilterSelectContainer>
                <ContentTitleFilterSelectTypo>정렬 기준 :</ContentTitleFilterSelectTypo>
                <ContentTitleFilterSelect
                  options={preLectureGroupFilterOptionList}
                  value={preLectureGroupFilterOption}
                  onChange={(value: any) => {
                    setPreLectureGroupFilterOption(value)
                  }}
                />
              </ContentTitleFilterSelectContainer>
            </ContentTitleContainer>
            <ContentLectureContainer>
              {isOpened &&
                filteredPreLectureGroupList.map((preLectureGroupItem) => (
                  <PreLectureGroupCard
                    {...preLectureGroupItem}
                    groupId={id}
                    updatePreGroupList={updatePreLectureGroupList}
                    key={`pre_group_item_${preLectureGroupItem.id}`}
                  />
                ))}
            </ContentLectureContainer>
            <PreLectureGroupAddModal
              conditionId={conditionId}
              groupId={id}
              updatePreGroupList={updatePreLectureGroupList}
            />
            <ContentTitleContainer>
              <ContentTitleTypo>강의 개설 내역</ContentTitleTypo>
              <ContentTitleFilterSelectContainer>
                <ContentTitleFilterSelectTypo>정렬 기준 :</ContentTitleFilterSelectTypo>
                <ContentTitleFilterSelect
                  options={filterOptionList}
                  value={filterOption}
                  onChange={(value: any) => {
                    setFilterOption(value)
                  }}
                />
              </ContentTitleFilterSelectContainer>
            </ContentTitleContainer>
            <ContentLectureContainer>
              {!isOpened && <Spin />}
              {isOpened &&
                filteredLectureIdentificationList.map((lectureIdentificationItem) => (
                  <LectureIdentificationCard
                    {...lectureIdentificationItem}
                    groupId={id}
                    updateLectureIdentificationList={updateLectureIdentificationList}
                    key={`lecture_identification_item_${lectureIdentificationItem.id}`}
                  />
                ))}
            </ContentLectureContainer>
            <LectureIdentificationAddModal
              groupId={id}
              updateLectureIdentificationList={updateLectureIdentificationList}
            />
            <ContentButton danger onClick={onClickDeleteButton}>
              그룹 삭제 <ContentDeleteButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
