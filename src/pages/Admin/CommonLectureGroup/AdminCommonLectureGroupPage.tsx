import { message } from 'antd'
import { getCommonLectureGroups } from 'apis/commonLectureGroups/getCommonLectureGroups'
import { postCommonLectureGroups } from 'apis/commonLectureGroups/postCommonLectureGroups'
import { Header } from 'components/Header'
import { FC, useEffect, useState } from 'react'
import { CommonLectureGroupCard } from './components/CommonLectureGroupCard'

import { Container, ContentAddButtonIcon, ContentButton, ContentContainer, Root, TitleTypo } from './styled'
import { CommonLectureGroupListType } from './type'

type AdminCommonLectureGroupPageProps = {
  className?: string
}

export const AdminCommonLectureGroupPage: FC<AdminCommonLectureGroupPageProps> = ({ className }) => {
  const [commonLectureGroupList, setCommonLectureGroupList] = useState<CommonLectureGroupListType>([])

  const updateCommonLectureGroupList = () => {
    getCommonLectureGroups().then((res) => {
      if (res.success) {
        setCommonLectureGroupList(res.data)
      }
    })
  }

  const onClickAddCommonLectureGroupButton = () => {
    postCommonLectureGroups({ name: '새로운 공통 그룹' }).then((res) => {
      if (res.success) {
        message.info('공통 강의 그룹 생성에 성공했습니다.')
        updateCommonLectureGroupList()
      }
      if (res.error) {
        message.error('공통 그룹 생성에 실패했습니다.')
      }
    })
  }

  useEffect(() => {
    updateCommonLectureGroupList()
  }, [])

  return (
    <Root className={className}>
      <Header type={'ADMIN'} />
      <Container>
        <TitleTypo>공통 그룹 수정</TitleTypo>
        <ContentContainer>
          {commonLectureGroupList
            .sort((a, b) => a.id - b.id)
            .map((commonLectureGroupItem) => (
              <CommonLectureGroupCard
                {...commonLectureGroupItem}
                updateCommonLectureGroupList={updateCommonLectureGroupList}
                key={`common_lecture_group_item_${commonLectureGroupItem.id}`}
              />
            ))}
          <ContentButton type={'primary'} onClick={onClickAddCommonLectureGroupButton}>
            공통 그룹 추가 <ContentAddButtonIcon />
          </ContentButton>
        </ContentContainer>
      </Container>
    </Root>
  )
}
