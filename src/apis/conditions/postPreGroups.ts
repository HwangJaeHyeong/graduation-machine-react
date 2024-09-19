import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
  preGroupId: number
  year: string
}

type Type = {}

export const postPreGroups = async ({ groupId, preGroupId, year }: Props) => {
  return await commonAxios('POST')(`api/v1/lecture-groups/${groupId}/prerequests`, {
    id: preGroupId,
    year,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
