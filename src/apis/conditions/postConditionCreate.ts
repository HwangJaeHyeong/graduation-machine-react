import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  tech: string
  year: number
}

type Type = {}

export const postConditionsCreate = async ({ tech, year }: Props) => {
  return await commonAxios('POST')(`api/v1/conditions`, {
    tech,
    year,
    total_minimum_credit: 0,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
