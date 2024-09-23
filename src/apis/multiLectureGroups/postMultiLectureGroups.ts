import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
}

type Type = {}

export const postMultiLectureGroups = async ({ groupId }: Props) => {
  return await commonAxios('POST')(`api/v1/lecture-groups/${groupId}/multi-lecture-groups`, {}).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
