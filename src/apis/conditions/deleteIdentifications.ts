import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
  identificationId: number
}

type Type = {}

export const deleteIdentifications = async ({ groupId, identificationId }: Props) => {
  return await commonAxios('DELETE')(`api/v1/lecture-groups/${groupId}/lectures/${identificationId}`, {}).then(
    (res) => {
      const response = camelizeKey(res?.data) as CommonResponseType<Type>
      return response
    }
  )
}
