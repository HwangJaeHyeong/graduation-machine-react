import { message } from 'antd'
import { getAllIdentifications } from 'apis/conditions/getAllIdentifications'
import { postIdentifications } from 'apis/conditions/postIdentifications'
import { FC, useEffect, useState } from 'react'
import { LectureIdentificationItemType, LectureIdentificationListType } from 'types/lecture'
import {
  ContentAddButtonIcon,
  ContentButton,
  ContentContainer,
  ContentInput,
  ContentModal,
  ContentSelect,
  Root,
} from './styled'

type LectureIdentificationAddModalProps = {
  className?: string
  groupId: number
  updateLectureIdentificationList: () => void
}

export const LectureIdentificationAddModal: FC<LectureIdentificationAddModalProps> = ({
  className,
  groupId,
  updateLectureIdentificationList,
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const [type, setType] = useState<undefined | 'none' | 'name' | 'code'>()
  const [keyword, setKeyword] = useState<string | number>('')
  const [lectureIdentificationList, setLectureIdentificationList] = useState<LectureIdentificationListType>([])

  const onCancel = () => {
    setOpened(false)
    setType(undefined)
    setKeyword('')
  }

  const onClickButton = () => {
    setOpened(true)
  }

  const onChangeTypeSelect = (value: any) => {
    setType(value)
    setKeyword('')
  }

  const onChangeLectureIdentificationSelect = (value: any) => {
    const newLectureIdentificationItem: LectureIdentificationItemType = JSON.parse(value)
    setKeyword(newLectureIdentificationItem.id)
  }

  const onClickSubmit = () => {
    if (type === undefined) {
      message.error('강의 추가 방식을 선택해주세요.')
      return
    }

    if (type === 'name' || type === 'code') {
      if (typeof keyword === 'number' || keyword.length < 2) {
        message.error('키워드를 두 글자 이상 입력해주세요.')
        return
      }
    }

    postIdentifications({ groupId, type, keyword }).then((res) => {
      if (res.success) {
        message.info('강의 추가가 성공적으로 완료되었습니다.')
        updateLectureIdentificationList()
      }
      if (res.error) {
        message.error('강의 추가를 실패했습니다.')
      }
    })

    onCancel()
  }

  const washedLectureIdentificationOptionList = lectureIdentificationList.map((value) => ({
    label: `${value.year}-${value.season} ${value.code} ${value.name}`,
    value: JSON.stringify(value),
  }))

  useEffect(() => {
    getAllIdentifications().then((res) => {
      setLectureIdentificationList(res.data)
    })
  }, [])

  return (
    <Root className={className}>
      <ContentButton onClick={onClickButton} type={'primary'}>
        강의 추가
        <ContentAddButtonIcon />
      </ContentButton>
      <ContentModal open={opened} onCancel={onCancel} footer={null} title={'강의 추가'}>
        <ContentContainer>
          <ContentSelect
            placeholder={'강의 추가 방식을 선택해주세요.'}
            options={[
              { value: 'none', label: '선택해서 추가하기' },
              { value: 'name', label: '이름으로 추가하기' },
              { value: 'code', label: '학수 번호로 추가하기' },
            ]}
            value={type}
            onChange={onChangeTypeSelect}
          />
          {(type === 'code' || type === 'name') && (
            <ContentInput
              placeholder="키워드를 입력해주세요."
              value={keyword}
              onChange={(e: any) => setKeyword(e.target.value)}
            />
          )}
          {type === 'none' && (
            <ContentSelect
              placeholder={'강의를 선택해주세요.'}
              showSearch
              options={washedLectureIdentificationOptionList}
              onChange={onChangeLectureIdentificationSelect}
            />
          )}
          <ContentButton onClick={onClickSubmit} type={'primary'} style={{ marginTop: 10 }}>
            완료
          </ContentButton>
        </ContentContainer>
      </ContentModal>
    </Root>
  )
}
