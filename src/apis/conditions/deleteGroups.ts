import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  conditionId: number
  groupId: number
}

type Type = {}

export const deleteGroups = async ({ conditionId, groupId }: Props) => {
  return await commonAxios('DELETE')(`api/v1/lecture-conditions/${conditionId}/lecture-groups/${groupId}`, {}).then(
    (res) => {
      const response = camelizeKey(res?.data) as CommonResponseType<Type>
      return response
    }
  )
}
