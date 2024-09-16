import { deleteIdentifications } from 'apis/conditions/deleteIdentifications'
import { FC } from 'react'
import { LectureIdentificationItemType } from 'types/lecture'
import { ContentButton, ContentTypo, DeleteIcon, Root } from './styled'

type LectureIdentificationCardProps = {
  className?: string
  groupId: number
  updateLectureIdentificationList: () => void
} & LectureIdentificationItemType

export const LectureIdentificationCard: FC<LectureIdentificationCardProps> = ({
  className,
  code,
  credit,
  id,
  groupId,
  name,
  season,
  year,
  updateLectureIdentificationList,
}) => {
  const onClickDeleteButton = () => {
    if (confirm('정말로 identification을 삭제하시겠습니까?')) {
      deleteIdentifications({ groupId, identificationId: id }).then((res) => {
        if (res.success) {
          updateLectureIdentificationList()
        }
      })
    }
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
