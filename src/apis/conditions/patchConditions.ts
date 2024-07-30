import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  graduationId: number
  conditionId: number
  name: string
  minimumCredit: number
}

type Type = {}

export const patchConditions = async ({ graduationId, conditionId, name, minimumCredit }: Props) => {
  return await commonAxios('PATCH')(`api/v1/conditions/${graduationId}/lecture-conditions/${conditionId}`, {
    name,
    minimum_credit: minimumCredit,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
