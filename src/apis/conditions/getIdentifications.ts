import { commonAxios } from 'apis/common'
import { LectureIdentificationListType } from 'types/lecture'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  id: number
}

type Type = {} & LectureIdentificationListType

export const getIdentifications = async ({ id }: Props) => {
  return await commonAxios('GET')(`api/v1/lecture-groups/${id}/lectures`, {}).then((res) => {
    const response = camelizeKey(res?.data.data) as Type
    return response
  })
}
