import { FC } from 'react'
import { Root } from './styled'

type PreLectureItemCardProps = {
  className?: string
}

export const PreLectureItemCard: FC<PreLectureItemCardProps> = ({ className }) => {
  return <Root className={className}>PreLectureItemCard</Root>
}
