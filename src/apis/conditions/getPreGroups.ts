import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  id: number
}

type Type = {
  id: number
  name: string
}[]

export const getPreGroups = async ({ id }: Props) => {
  return await commonAxios('GET')(`api/v1/lecture-groups/${id}/prerequests`, {}).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
