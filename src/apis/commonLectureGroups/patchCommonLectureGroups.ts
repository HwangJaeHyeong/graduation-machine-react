import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  commonLectureGroupId: number
  name: string
}

type Type = {}

export const patchCommonLectureGroups = async ({ commonLectureGroupId, name }: Props) => {
  return await commonAxios('PATCH')(`api/v1/common-lecture-groups/${commonLectureGroupId}`, {
    name,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
