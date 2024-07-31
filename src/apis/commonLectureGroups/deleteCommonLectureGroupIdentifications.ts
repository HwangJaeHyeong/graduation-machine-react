import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = { commonLectureGroupIdentificationId: number }

type Type = {}

export const deleteCommonLectureGroupIdentifications = async ({ commonLectureGroupIdentificationId }: Props) => {
  return await commonAxios('DELETE')(
    `api/v1/common-lecture-groups/lectures/${commonLectureGroupIdentificationId}`,
    {}
  ).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
