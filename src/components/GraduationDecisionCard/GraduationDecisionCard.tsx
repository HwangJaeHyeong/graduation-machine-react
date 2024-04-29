import { FC } from 'react'
import { ConditionItemType } from 'types/common'
import { ExcelLectureListType, LectureIdentificationListType } from 'types/lecture'
import {
  GroupCard,
  GroupCardCheckLectureTakenTypo,
  GroupCardContainer,
  GroupCardEssentialTypo,
  GroupCardTitleTypo,
  Root,
  TitleTypo,
} from './styled'

type GraduationDecisionCardProps = {
  className?: string
  conditionItem: ConditionItemType
  excelLectureList: ExcelLectureListType
}

export const GraduationDecisionCard: FC<GraduationDecisionCardProps> = ({
  className,
  conditionItem,
  excelLectureList,
}) => {
  const checkLectureTaken = (lectureIdentificationList: LectureIdentificationListType) => {
    lectureIdentificationList.forEach((lectureIdentificationItem) => {
      excelLectureList.forEach((excelLectureItem) => {
        if (lectureIdentificationItem.code.indexOf(excelLectureItem.code) !== -1) {
          return true
        }
      })
    })
    return false
  }

  return (
    <Root className={className}>
      <TitleTypo>
        {conditionItem.title} (최소 {conditionItem.minimumCredit}학점)
      </TitleTypo>
      <GroupCardContainer>
        {conditionItem.lectureConditionGroupList.map((lectureConditionGroupItem) => (
          <GroupCard key={`lecture_condition_group_item_${lectureConditionGroupItem.id}`}>
            <GroupCardTitleTypo>이름 : {lectureConditionGroupItem.title}</GroupCardTitleTypo>
            <GroupCardEssentialTypo>
              필수 여부 : {lectureConditionGroupItem.isEssential ? '필수' : '선택'}
            </GroupCardEssentialTypo>
            <GroupCardCheckLectureTakenTypo>
              수강 여부 : {checkLectureTaken(lectureConditionGroupItem.lectureIdentificationList) ? '수강' : '미수강'}
            </GroupCardCheckLectureTakenTypo>
          </GroupCard>
        ))}
      </GroupCardContainer>
    </Root>
  )
}
