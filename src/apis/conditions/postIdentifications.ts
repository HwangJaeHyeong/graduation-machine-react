import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  groupId: number
  type: 'none' | 'name' | 'code'
  keyword?: string | number
}

type Type = {}

export const postIdentifications = async ({ groupId, type: defaultType, keyword }: Props) => {
  const type = defaultType ?? 'none'

  return await commonAxios('POST')(`api/v1/lecture-groups/${groupId}/lectures?type=${type}`, {
    keyword,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
