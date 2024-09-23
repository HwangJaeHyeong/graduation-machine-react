import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
  multiGroupId: number
}

type Type = {}

export const deleteMultiLectureGroups = async ({ groupId, multiGroupId }: Props) => {
  return await commonAxios('DELETE')(`api/v1/lecture-groups/${groupId}/multi-lecture-groups/${multiGroupId}`, {}).then(
    (res) => {
      const response = camelizeKey(res?.data) as CommonResponseType<Type>
      return response
    }
  )
}
