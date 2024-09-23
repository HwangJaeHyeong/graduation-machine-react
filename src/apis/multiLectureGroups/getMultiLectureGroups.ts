import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
}

type Type = {
  id: number
  minimumNumber: number
  maximumNumber: number
}

export const getMultiLectureGroups = async ({ groupId }: Props) => {
  return await commonAxios('GET')(`api/v1/lecture-groups/${groupId}/multi-lecture-groups`, {}).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
