import { FC } from 'react'
import { PreLectureGroupItemType } from '../../type'
import { ContentButton, ContentTypo, DeleteIcon, Root } from './styled'

type PreLectureGroupCardProps = {
  className?: string
} & PreLectureGroupItemType

export const PreLectureGroupCard: FC<PreLectureGroupCardProps> = ({ className, name }) => {
  const onClickDeleteButton = () => {}

  return (
    <Root className={className}>
      <ContentTypo>{`선이수 그룹명 : ${name}`}</ContentTypo>
      <ContentButton shape={'circle'} onClick={onClickDeleteButton}>
        <DeleteIcon />
      </ContentButton>
    </Root>
  )
}
