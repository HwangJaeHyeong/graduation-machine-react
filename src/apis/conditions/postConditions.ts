import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  graduationId: number
  name: string
  minimumCredit: number
}

type Type = {}

export const postConditions = async ({ graduationId, name, minimumCredit }: Props) => {
  return await commonAxios('POST')(`api/v1/conditions/${graduationId}/lecture-conditions`, {
    name,
    minimum_credit: minimumCredit,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
