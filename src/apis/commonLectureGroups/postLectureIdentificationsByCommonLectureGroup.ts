import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
  commonLectureGroupId: number
}

type Type = {}

export const postLectureIdentificationsByCommonLectureGroup = async ({ groupId, commonLectureGroupId }: Props) => {
  return await commonAxios('POST')(`api/v1/lecture-groups/${groupId}/lectures-by-common-lecture-group`, {
    id: commonLectureGroupId,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
