import { FC } from 'react'
import { LectureIdentificationItemType } from 'types/lecture'
import { ContentButton, ContentTypo, DeleteIcon, Root } from './styled'

type LectureIdentificationCardProps = {
  className?: string
} & LectureIdentificationItemType

export const LectureIdentificationCard: FC<LectureIdentificationCardProps> = ({
  className,
  code,
  credit,
  id,
  name,
  season,
  year,
}) => {
  return (
    <Root className={className}>
      <ContentTypo>{`학기: ${year}-${season}, 학수번호: ${code}, 강의명: ${name}, 학점: ${credit}`}</ContentTypo>
      <ContentButton shape={'circle'}>
        <DeleteIcon />
      </ContentButton>
    </Root>
  )
}
