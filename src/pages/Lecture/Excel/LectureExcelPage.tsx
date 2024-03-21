import { FC } from 'react'
import { Root } from './styled'

type LectureExcelPageProps = {
  className?: string
}

export const LectureExcelPage: FC<LectureExcelPageProps> = ({ className }) => {
  return <Root className={className}>LectureExcelPage</Root>
}
