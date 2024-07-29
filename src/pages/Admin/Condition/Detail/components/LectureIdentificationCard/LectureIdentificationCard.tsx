import { FC } from 'react'
import { Root } from './styled'

type LectureIdentificationCardProps = {
  className?: string
}

export const LectureIdentificationCard: FC<LectureIdentificationCardProps> = ({ className }) => {
  return <Root className={className}>LectureIdentificationCard</Root>
}
