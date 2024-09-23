import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
  multiGroupId: number
  minimum: number
  maximum: number
}

type Type = {}

export const patchMultiLectureGroups = async ({ groupId, multiGroupId, maximum, minimum }: Props) => {
  return await commonAxios('PATCH')(`api/v1/lecture-groups/${groupId}/multi-lecture-groups/${multiGroupId}`, {
    minimum_number: minimum,
    maximum_number: maximum,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
