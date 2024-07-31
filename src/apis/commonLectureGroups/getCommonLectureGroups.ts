import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {}

type Type = {
  id: number
  name: string
}[]

export const getCommonLectureGroups = async ({}: Props) => {
  return await commonAxios('GET')(`api/v1/common-lecture-groups`, {}).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
