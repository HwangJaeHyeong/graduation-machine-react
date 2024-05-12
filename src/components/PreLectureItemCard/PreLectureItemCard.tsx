import { DeleteOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { ConditionListType } from 'types/common'
import { PreLectureItemType } from 'types/lecture'
import { ContentButton, ContentButtonContainer, Root, SummaryTypo } from './styled'

type PreLectureItemCardProps = {
  className?: string
  conditionList: ConditionListType
  preLectureItem: PreLectureItemType
  onDelete: (preLectureItem: PreLectureItemType) => void
}

type PreLectureItemDetailType = PreLectureItemType & { title: string }

export const PreLectureItemCard: FC<PreLectureItemCardProps> = ({
  className,
  conditionList,
  preLectureItem,
  onDelete,
}) => {
  const preLectureItemDetail: PreLectureItemDetailType = (() => {
    let newPreLectureItemDetail: PreLectureItemDetailType = { ...preLectureItem, title: '' }
    conditionList.forEach((conditionItem) => {
      conditionItem.lectureConditionGroupList.forEach((groupItem) => {
        if (conditionItem.id === preLectureItem.conditionId && groupItem.id === preLectureItem.groupId) {
          newPreLectureItemDetail = { ...newPreLectureItemDetail, title: groupItem.title }
        }
      })
    })
    return newPreLectureItemDetail
  })()

  const onClickDeleteButton = () => {
    if (confirm('정말로 선이수 강의를 삭제하시겠습니까?')) {
      onDelete(preLectureItem)
      return
    }
  }

  return (
    <Root className={className}>
      <SummaryTypo>{preLectureItemDetail.title}</SummaryTypo>
      <ContentButtonContainer>
        <ContentButton type="default" shape="circle" icon={<DeleteOutlined />} onClick={onClickDeleteButton} />
      </ContentButtonContainer>
    </Root>
  )
}
