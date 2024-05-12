import { FC } from 'react'
import { Root } from './styled'

type SelectPreLectureModalProps = {
  className?: string
}

export const SelectPreLectureModal: FC<SelectPreLectureModalProps> = ({ className }) => {
  return <Root className={className}>SelectPreLectureModal</Root>
}
