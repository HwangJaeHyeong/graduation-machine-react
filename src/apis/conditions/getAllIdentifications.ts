import { commonAxios, CommonResponseType } from 'apis/common'
import { LectureIdentificationListType } from 'types/lecture'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {}

type Type = {} & LectureIdentificationListType

export const getAllIdentifications = async () => {
  return await commonAxios('GET')(`api/v1/lecture-identifications`, {}).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
