import { FC, useRef } from 'react'
import { ConditionItemType, ConditionListType } from 'types/common'
import { ExcelLectureListType } from 'types/lecture'
import { compareLectureYearAndSeason } from 'utils/compareLectureYearAndSeason'
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
  conditionList: ConditionListType
  conditionItem: ConditionItemType
  excelLectureList: ExcelLectureListType
}

// NONE_01: 아예 수강 x or 동시 수강, NONE_02: 수강 x, DONE: 선이수 체계 맞게 수강
type CheckPreLectureStatusType = 'NONE_01' | 'NONE_02' | 'DONE'

export const GraduationDecisionCard: FC<GraduationDecisionCardProps> = ({
  className,
  conditionList,
  conditionItem,
  excelLectureList,
}) => {
  // const [totalTakenCredit, setTotalTakenCredit] = useState<number>(0)

  const totalTakenCredit = useRef(0)

  const washedLectureList = (() => {
    return conditionItem.lectureConditionGroupList.map((lectureConditionGroupItem) => {
      let check = false,
        credit = 0
      let newPreLectureList = lectureConditionGroupItem?.preLectureList ?? []
      let newPreLectureCheckList: CheckPreLectureStatusType[] = [...Array(newPreLectureList.length)].map(
        () => 'NONE_01'
      )
      let currentLectureItem: any = null

      lectureConditionGroupItem.lectureIdentificationList.forEach((lectureIdentificationItem) => {
        excelLectureList.forEach((excelLectureItem) => {
          if (lectureIdentificationItem.code.indexOf(excelLectureItem.code) !== -1) {
            check = true
            credit = +excelLectureItem.credit
            currentLectureItem = excelLectureItem
          }
        })
      })

      if (check && currentLectureItem) {
        newPreLectureList.forEach((newPreLectureItem, newPreLectureItemIndex) => {
          conditionList.forEach((conditionItem2) => {
            if (conditionItem2.id === newPreLectureItem.conditionId) {
              conditionItem2.lectureConditionGroupList.forEach((groupItem2) => {
                if (groupItem2.id === newPreLectureItem.groupId) {
                  groupItem2.lectureIdentificationList.forEach((lectureIdentification2) => {
                    excelLectureList.forEach((excelLectureItem) => {
                      if (
                        +lectureIdentification2.year === +excelLectureItem.year &&
                        lectureIdentification2.season === excelLectureItem.season &&
                        lectureIdentification2.code.indexOf(excelLectureItem.code) !== -1
                      ) {
                        console.log(
                          lectureConditionGroupItem.title,
                          +currentLectureItem.year,
                          currentLectureItem.season,
                          +excelLectureItem.year,
                          excelLectureItem.season,
                          +lectureIdentification2.year,
                          lectureIdentification2.season
                        )
                        if (
                          compareLectureYearAndSeason(
                            { year: +excelLectureItem.year, season: excelLectureItem.season },
                            { year: +currentLectureItem.year, season: currentLectureItem.season }
                          )
                        ) {
                          newPreLectureCheckList[newPreLectureItemIndex] = 'DONE'
                        } else {
                          newPreLectureCheckList[newPreLectureItemIndex] = 'NONE_02'
                        }
                      }
                    })
                  })
                }
              })
            }
          })
        })
      }

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
        preLectureCheckList: newPreLectureCheckList,
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
                          {lectureItem?.preLectureCheckList && lectureItem.preLectureCheckList.length > 0 && (
                            <GroupCardEssentialTypo>
                              선이수 : {JSON.stringify(lectureItem.preLectureCheckList)}
                            </GroupCardEssentialTypo>
                          )}
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
                  .filter((lectureItem) => lectureItem.isEssential)
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
                  .filter((lectureItem) => !lectureItem.isEssential)
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
