import { FC } from 'react'
import { Root } from './styled'

type LectureGroupPageProps = {
  className?: string
}

export const LectureGroupPage: FC<LectureGroupPageProps> = ({ className }) => {
  return <Root className={className}>LectureGroupPage</Root>
}
