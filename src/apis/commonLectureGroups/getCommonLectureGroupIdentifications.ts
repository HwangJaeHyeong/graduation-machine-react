import { commonAxios, CommonResponseType } from 'apis/common'
import { LectureIdentificationListType } from 'types/lecture'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  commonLectureGroupId: number
}

type Type = LectureIdentificationListType

export const getCommonLectureGroupIdentifications = async ({ commonLectureGroupId }: Props) => {
  return await commonAxios('GET')(`api/v1/common-lecture-groups/${commonLectureGroupId}/lectures/`, {}).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
