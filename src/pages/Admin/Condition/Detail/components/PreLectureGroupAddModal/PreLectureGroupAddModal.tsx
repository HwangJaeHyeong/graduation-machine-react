import { FC, useEffect, useState } from 'react'
import { ContentAddButtonIcon, ContentButton, ContentModal, Root } from './styled'

type PreLectureGroupAddModalProps = {
  className?: string
}

export const PreLectureGroupAddModal: FC<PreLectureGroupAddModalProps> = ({ className }) => {
  const [opened, setOpened] = useState<boolean>(false)

  const onClickButton = () => {
    setOpened(true)
  }

  useEffect(() => {}, [])

  return (
    <Root className={className}>
      <ContentButton onClick={onClickButton}>
        선이수 강의 추가
        <ContentAddButtonIcon />
      </ContentButton>
      <ContentModal open={opened} onCancel={() => setOpened(false)}></ContentModal>
    </Root>
  )
}
