import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  conditionId: number
  groupId: number
  name: string
  isEssential: boolean
}

type Type = {}

export const patchGroups = async ({ conditionId, groupId, name, isEssential }: Props) => {
  return await commonAxios('PATCH')(`api/v1/lecture-conditions/${conditionId}/lecture-groups/${groupId}`, {
    name,
    is_essential: isEssential,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
