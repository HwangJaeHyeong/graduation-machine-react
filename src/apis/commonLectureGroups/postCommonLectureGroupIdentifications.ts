import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  commonLectureGroupId: number
  type: 'none' | 'name' | 'code'
  keyword?: string | number
}

type Type = {}

export const postCommonLectureGroupIdentifications = async ({ commonLectureGroupId, type, keyword }: Props) => {
  return await commonAxios('POST')(`api/v1/common-lecture-groups/${commonLectureGroupId}/lectures`, {
    type,
    keyword,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
