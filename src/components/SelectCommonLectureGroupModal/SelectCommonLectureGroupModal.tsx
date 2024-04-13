import { FC } from 'react'
import { Root } from './styled'

type SelectCommonLectureGroupModalProps = {
  className?: string
}

export const SelectCommonLectureGroupModal: FC<SelectCommonLectureGroupModalProps> = ({ className }) => {
  return <Root className={className}>SelectCommonLectureGroupModal</Root>
}
