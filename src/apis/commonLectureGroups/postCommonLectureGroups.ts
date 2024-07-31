import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  name: string
}

type Type = {}

export const postCommonLectureGroups = async ({ name }: Props) => {
  return await commonAxios('POST')(`api/v1/common-lecture-groups`, {
    name,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
