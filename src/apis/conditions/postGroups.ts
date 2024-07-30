import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  conditionId: number
  name: string
  isEssential: boolean
}

type Type = {}

export const postGroups = async ({ conditionId, name, isEssential }: Props) => {
  return await commonAxios('POST')(`api/v1/lecture-conditions/${conditionId}/lecture-groups`, {
    name,
    is_essential: isEssential,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
