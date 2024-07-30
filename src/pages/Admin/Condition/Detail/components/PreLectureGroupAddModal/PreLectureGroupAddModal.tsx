import { FC } from 'react'
import { Root } from './styled'

type PreLectureGroupAddModalProps = {
  className?: string
}

export const PreLectureGroupAddModal: FC<PreLectureGroupAddModalProps> = ({ className }) => {
  return <Root className={className}>PreLectureGroupAddModal</Root>
}
