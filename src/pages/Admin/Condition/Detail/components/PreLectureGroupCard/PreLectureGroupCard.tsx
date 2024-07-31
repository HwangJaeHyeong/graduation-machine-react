import { message } from 'antd'
import { deletePreGroups } from 'apis/conditions/deletePreGroups'
import { FC } from 'react'
import { PreLectureGroupItemType } from '../../type'
import { ContentButton, ContentTypo, DeleteIcon, Root } from './styled'

type PreLectureGroupCardProps = {
  className?: string
  groupId: number
  updatePreGroupList: () => void
} & PreLectureGroupItemType

export const PreLectureGroupCard: FC<PreLectureGroupCardProps> = ({
  className,
  name,
  id,
  groupId,
  updatePreGroupList,
}) => {
  const onClickDeleteButton = () => {
    deletePreGroups({ groupId, preGroupId: id }).then((res) => {
      if (res.success) {
        message.info('선이수 그룹 삭제를 성공했습니다.')
        updatePreGroupList()
      }
      if (res.error) {
        message.error('선이수 그룹 삭제를 실패했습니다.')
      }
    })
  }

  return (
    <Root className={className}>
      <ContentTypo>{`선이수 그룹명 : ${name}`}</ContentTypo>
      <ContentButton shape={'circle'} onClick={onClickDeleteButton}>
        <DeleteIcon />
      </ContentButton>
    </Root>
  )
}
