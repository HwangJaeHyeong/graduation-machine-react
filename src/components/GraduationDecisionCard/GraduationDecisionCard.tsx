import { FC, useRef } from 'react'
import { ConditionItemType } from 'types/common'
import { ExcelLectureListType } from 'types/lecture'
import {
  ContentCardCollapse,
  ContentCardCollapseInnerContainer,
  GroupCard,
  GroupCardCheckLectureTakenTypo,
  GroupCardContainer,
  GroupCardCreditTypo,
  GroupCardEssentialTypo,
  GroupCardSectionTitleTypo,
  GroupCardTitleTypo,
  PreviousLectureContainer,
  PreviousLectureContentTypo,
  PreviousLectureTitleTypo,
  ResultTypo,
  Root,
  TitleTypo,
  TotalTakenCreditTypo,
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
  // const [totalTakenCredit, setTotalTakenCredit] = useState<number>(0)

  const totalTakenCredit = useRef(0)

  const washedLectureList = (() => {
    return conditionItem.lectureConditionGroupList.map((lectureConditionGroupItem) => {
      let check = false,
        credit = 0
      lectureConditionGroupItem.lectureIdentificationList.forEach((lectureIdentificationItem) => {
        excelLectureList.forEach((excelLectureItem) => {
          if (lectureIdentificationItem.code.indexOf(excelLectureItem.code) !== -1) {
            check = true
            credit = +excelLectureItem.credit
          }
        })
      })
      if (typeof credit === 'number') {
        totalTakenCredit.current += credit
      }
      return {
        id: lectureConditionGroupItem.id,
        title: lectureConditionGroupItem.title,
        isEssential: lectureConditionGroupItem.isEssential,
        lectureIdentificationList: lectureConditionGroupItem.lectureIdentificationList,
        credit,
        isTaken: check,
      }
    })
  })()

  const isConditionPassed = (() => {
    if (totalTakenCredit.current < conditionItem.minimumCredit) {
      return false
    }
    return washedLectureList.filter((value) => value.isEssential).filter((value) => !value.isTaken).length === 0
  })()

  return (
    <Root className={className}>
      <TitleTypo>
        {conditionItem.title} (최소 {conditionItem.minimumCredit}학점)
      </TitleTypo>
      <GroupCardContainer>
        {washedLectureList.filter((lectureItem) => lectureItem.isTaken).length !== 0 && (
          <ContentCardCollapse>
            <ContentCardCollapse.Panel
              key={`is_taken_content_card`}
              header={<GroupCardSectionTitleTypo>수강 과목</GroupCardSectionTitleTypo>}
            >
              <ContentCardCollapseInnerContainer>
                {washedLectureList
                  .filter((lectureItem) => lectureItem.isTaken)
                  .map((lectureItem) => (
                    <ContentCardCollapse key={`is_taken_lecture_condition_group_item_${lectureItem.id}`}>
                      <ContentCardCollapse.Panel
                        key={`content_card_${conditionItem.id}_1`}
                        header={<GroupCardTitleTypo> {lectureItem.title}</GroupCardTitleTypo>}
                      >
                        <GroupCard>
                          <GroupCardEssentialTypo>
                            필수 여부 : {lectureItem.isEssential ? '필수' : '선택'}
                          </GroupCardEssentialTypo>
                          <GroupCardCheckLectureTakenTypo>{`수강 여부 : ${
                            lectureItem.isTaken ? '수강' : '미수강'
                          }`}</GroupCardCheckLectureTakenTypo>
                          {lectureItem.isTaken && (
                            <GroupCardCreditTypo>{`학점 : ${lectureItem.credit}`}</GroupCardCreditTypo>
                          )}
                        </GroupCard>
                      </ContentCardCollapse.Panel>
                    </ContentCardCollapse>
                  ))}
              </ContentCardCollapseInnerContainer>
            </ContentCardCollapse.Panel>
          </ContentCardCollapse>
        )}
        {washedLectureList
          .filter((lectureItem) => !lectureItem.isTaken)
          .filter((lectureItem) => lectureItem.isEssential).length !== 0 && (
          <ContentCardCollapse>
            <ContentCardCollapse.Panel
              key={`is_not_taken_content_card`}
              header={<GroupCardSectionTitleTypo>(필수) 미수강 과목</GroupCardSectionTitleTypo>}
            >
              <ContentCardCollapseInnerContainer>
                {washedLectureList
                  .filter((lectureItem) => !lectureItem.isTaken)
                  .map((lectureItem) => (
                    <ContentCardCollapse key={`is_not_taken_lecture_condition_group_item_${lectureItem.id}`}>
                      <ContentCardCollapse.Panel
                        key={`content_card_${conditionItem.id}_1`}
                        header={<GroupCardTitleTypo> {lectureItem.title}</GroupCardTitleTypo>}
                      >
                        <GroupCard>
                          <GroupCardEssentialTypo>
                            필수 여부 : {lectureItem.isEssential ? '필수' : '선택'}
                          </GroupCardEssentialTypo>
                          <GroupCardCheckLectureTakenTypo>{`수강 여부 : ${
                            lectureItem.isTaken ? '수강' : '미수강'
                          }`}</GroupCardCheckLectureTakenTypo>
                          {lectureItem.isTaken && (
                            <GroupCardCreditTypo>{`학점 : ${lectureItem.credit}`}</GroupCardCreditTypo>
                          )}
                          <PreviousLectureContainer>
                            <PreviousLectureTitleTypo>이전 개설 과목 내역</PreviousLectureTitleTypo>
                            {lectureItem.lectureIdentificationList.map((lectureIdentificationItem) => (
                              <PreviousLectureContentTypo
                                key={`lecture_identification_item_${lectureIdentificationItem.id}`}
                              >
                                {`학기 : ${lectureIdentificationItem.year}-${lectureIdentificationItem.season}, 학수번호 : ${lectureIdentificationItem.code}, 강의명 : ${lectureIdentificationItem.name}, 학점 : ${lectureIdentificationItem.credit}`}
                              </PreviousLectureContentTypo>
                            ))}
                          </PreviousLectureContainer>
                        </GroupCard>
                      </ContentCardCollapse.Panel>
                    </ContentCardCollapse>
                  ))}
              </ContentCardCollapseInnerContainer>
            </ContentCardCollapse.Panel>
          </ContentCardCollapse>
        )}
        {washedLectureList
          .filter((lectureItem) => !lectureItem.isTaken)
          .filter((lectureItem) => !lectureItem.isEssential).length !== 0 && (
          <ContentCardCollapse>
            <ContentCardCollapse.Panel
              key={`is_not_taken_content_card`}
              header={<GroupCardSectionTitleTypo>(선택) 미수강 과목</GroupCardSectionTitleTypo>}
            >
              <ContentCardCollapseInnerContainer>
                {washedLectureList
                  .filter((lectureItem) => !lectureItem.isTaken)
                  .map((lectureItem) => (
                    <ContentCardCollapse key={`is_not_taken_lecture_condition_group_item_${lectureItem.id}`}>
                      <ContentCardCollapse.Panel
                        key={`content_card_${conditionItem.id}_1`}
                        header={<GroupCardTitleTypo> {lectureItem.title}</GroupCardTitleTypo>}
                      >
                        <GroupCard>
                          <GroupCardEssentialTypo>
                            필수 여부 : {lectureItem.isEssential ? '필수' : '선택'}
                          </GroupCardEssentialTypo>
                          <GroupCardCheckLectureTakenTypo>{`수강 여부 : ${
                            lectureItem.isTaken ? '수강' : '미수강'
                          }`}</GroupCardCheckLectureTakenTypo>
                          {lectureItem.isTaken && (
                            <GroupCardCreditTypo>{`학점 : ${lectureItem.credit}`}</GroupCardCreditTypo>
                          )}
                          <PreviousLectureContainer>
                            <PreviousLectureTitleTypo>이전 개설 과목 내역</PreviousLectureTitleTypo>
                            {lectureItem.lectureIdentificationList.map((lectureIdentificationItem) => (
                              <PreviousLectureContentTypo
                                key={`lecture_identification_item_${lectureIdentificationItem.id}`}
                              >
                                {`학기 : ${lectureIdentificationItem.year}-${lectureIdentificationItem.season}, 학수번호 : ${lectureIdentificationItem.code}, 강의명 : ${lectureIdentificationItem.name}, 학점 : ${lectureIdentificationItem.credit}`}
                              </PreviousLectureContentTypo>
                            ))}
                          </PreviousLectureContainer>
                        </GroupCard>
                      </ContentCardCollapse.Panel>
                    </ContentCardCollapse>
                  ))}
              </ContentCardCollapseInnerContainer>
            </ContentCardCollapse.Panel>
          </ContentCardCollapse>
        )}
      </GroupCardContainer>
      <TotalTakenCreditTypo>총 수강 학점 : {totalTakenCredit.current}학점</TotalTakenCreditTypo>
      <ResultTypo>통과 여부 : {isConditionPassed ? 'pass' : 'failed'}</ResultTypo>
    </Root>
  )
}
