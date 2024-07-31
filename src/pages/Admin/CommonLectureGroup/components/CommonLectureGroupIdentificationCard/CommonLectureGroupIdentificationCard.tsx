import { deleteCommonLectureGroupIdentifications } from 'apis/commonLectureGroups/deleteCommonLectureGroupIdentifications'
import { FC } from 'react'
import { LectureIdentificationItemType } from 'types/lecture'
import { ContentButton, ContentTypo, DeleteIcon, Root } from './styled'

type CommonLectureGroupIdentificationCardProps = {
  className?: string
  commonLectureGroupId: number
  updateCommonLectureGroupIdentificationList: () => void
} & LectureIdentificationItemType

export const CommonLectureGroupIdentificationCard: FC<CommonLectureGroupIdentificationCardProps> = ({
  className,
  code,
  credit,
  id,
  commonLectureGroupId,
  name,
  season,
  year,
  updateCommonLectureGroupIdentificationList,
}) => {
  const onClickDeleteButton = () => {
    deleteCommonLectureGroupIdentifications({ commonLectureGroupId, commonLectureGroupIdentificationId: id }).then(
      (res) => {
        if (res.success) {
          updateCommonLectureGroupIdentificationList()
        }
      }
    )
  }

  return (
    <Root className={className}>
      <ContentTypo>{`학기: ${year}-${season}, 학수번호: ${code}, 강의명: ${name}, 학점: ${credit}`}</ContentTypo>
      <ContentButton shape={'circle'} onClick={onClickDeleteButton}>
        <DeleteIcon />
      </ContentButton>
    </Root>
  )
}
