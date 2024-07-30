import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
  preGroupId: number
}

type Type = {}

export const deletePreGroups = async ({ groupId, preGroupId }: Props) => {
  return await commonAxios('DELETE')(`api/v1/lecture-groups/${groupId}/prerequests/${preGroupId}`, {}).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
