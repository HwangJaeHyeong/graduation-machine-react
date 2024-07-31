import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = { commonLectureGroupId: number }

type Type = {}

export const deleteCommonLectureGroups = async ({ commonLectureGroupId }: Props) => {
  return await commonAxios('DELETE')(`api/v1/common-lecture-groups/${commonLectureGroupId}`, {}).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
