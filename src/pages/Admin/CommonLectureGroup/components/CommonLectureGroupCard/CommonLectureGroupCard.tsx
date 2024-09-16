import { Spin } from 'antd'
import { deleteCommonLectureGroups } from 'apis/commonLectureGroups/deleteCommonLectureGroups'
import { getCommonLectureGroupIdentifications } from 'apis/commonLectureGroups/getCommonLectureGroupIdentifications'
import { patchCommonLectureGroups } from 'apis/commonLectureGroups/patchCommonLectureGroups'
import { filterOptionList } from 'constants/common'
import { FC, useEffect, useState } from 'react'
import { FilterOptionType } from 'types/common'
import { LectureIdentificationListType } from 'types/lecture'
import { CommonLectureGroupItemType } from '../../type'
import { CommonLectureGroupIdentificationAddModal } from '../CommonLectureGroupIdentificationAddModal'
import { CommonLectureGroupIdentificationCard } from '../CommonLectureGroupIdentificationCard'
import {
  CardCollapse,
  CardCollapsePanel,
  CardTitleTypo,
  ContentButton,
  ContentContainer,
  ContentDeleteButtonIcon,
  ContentInput,
  ContentLectureContainer,
  ContentTitleContainer,
  ContentTitleFilterSelect,
  ContentTitleFilterSelectContainer,
  ContentTitleFilterSelectTypo,
  ContentTitleTypo,
  Root,
} from './styled'

type CommonLectureGroupCardProps = {
  className?: string
  updateCommonLectureGroupList: () => void
} & CommonLectureGroupItemType

export const CommonLectureGroupCard: FC<CommonLectureGroupCardProps> = ({
  className,
  id,
  name: defaultName,
  updateCommonLectureGroupList,
}) => {
  const [lectureIdentificationList, setLectureIdentificationList] = useState<LectureIdentificationListType>([])
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [name, setName] = useState<string>(defaultName)
  const [editable, setEditable] = useState<boolean>(false)
  const [filterOption, setFilterOption] = useState<FilterOptionType>('연도 dsc')

  const updateCommonLectureGroupIdentificationList = () => {
    getCommonLectureGroupIdentifications({ commonLectureGroupId: id }).then((res) => {
      setLectureIdentificationList(res.data)
    })
  }

  const onClickDeleteButton = () => {
    if (confirm('정말로 공통 그룹을 삭제하시겠습니까?')) {
      deleteCommonLectureGroups({ commonLectureGroupId: id }).then((res) => {
        if (res.success) {
          updateCommonLectureGroupList()
        }
      })
    }
  }

  const onClickEditButton = () => {
    setEditable((prev) => {
      if (prev) {
        patchCommonLectureGroups({ commonLectureGroupId: id, name }).then((res) => {
          if (res.success) {
            updateCommonLectureGroupList()
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

  useEffect(() => {
    updateCommonLectureGroupIdentificationList()
  }, [])

  return (
    <Root className={className} onClick={() => setIsOpened(true)}>
      <CardCollapse>
        <CardCollapsePanel
          header={<CardTitleTypo>{`${defaultName}`}</CardTitleTypo>}
          key={`lecture_condition_card_${id}`}
        >
          <ContentContainer>
            <ContentInput
              addonBefore={'공통 그룹명'}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              disabled={!editable}
            />
            <ContentButton type={'primary'} onClick={onClickEditButton}>
              {editable ? '수정 완료' : '공통 그룹 수정'}
            </ContentButton>
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
                lectureIdentificationList.map((lectureIdentificationItem) => (
                  <CommonLectureGroupIdentificationCard
                    {...lectureIdentificationItem}
                    commonLectureGroupId={id}
                    updateCommonLectureGroupIdentificationList={updateCommonLectureGroupIdentificationList}
                    key={`lecture_identification_item_${lectureIdentificationItem.id}`}
                  />
                ))}
            </ContentLectureContainer>
            <CommonLectureGroupIdentificationAddModal
              commonLectureGroupId={id}
              updateCommonLectureGroupIdentificationList={updateCommonLectureGroupIdentificationList}
            />
            <ContentButton danger onClick={onClickDeleteButton}>
              공통 그룹 삭제 <ContentDeleteButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
