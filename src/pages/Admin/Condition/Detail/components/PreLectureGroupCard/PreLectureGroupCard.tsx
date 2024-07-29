import { FC } from 'react'
import { Root } from './styled'

type PreLectureGroupCardProps = {
  className?: string
}

export const PreLectureGroupCard: FC<PreLectureGroupCardProps> = ({ className }) => {
  return <Root className={className}>PreLectureGroupCard</Root>
}
