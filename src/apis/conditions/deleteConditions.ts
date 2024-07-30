import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  graduationId: number
  conditionId: number
}

type Type = {}

export const deleteConditions = async ({ graduationId, conditionId }: Props) => {
  return await commonAxios('DELETE')(`api/v1/conditions/${graduationId}/lecture-conditions/${conditionId}`, {}).then(
    (res) => {
      const response = camelizeKey(res?.data) as CommonResponseType<Type>
      return response
    }
  )
}
