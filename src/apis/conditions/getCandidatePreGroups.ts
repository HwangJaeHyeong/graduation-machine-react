import { commonAxios, CommonResponseType } from 'apis/common'
import { LectureGroupListType } from 'pages/Admin/Condition/Detail/type'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  conditionId: number
  groupId: number
}

type Type = LectureGroupListType

export const getCandidatePreGroups = async ({ conditionId, groupId }: Props) => {
  return await commonAxios('GET')(
    `api/v1/lecture-conditions/${conditionId}/lecture-groups-for-prerequest/${groupId}`,
    {}
  ).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
