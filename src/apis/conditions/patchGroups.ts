import { commonAxios, CommonResponseType } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  conditionId: number
  groupId: number
  name: string
  isEssential: boolean
  isMultiLecture: boolean
  maximumNumber: number
  minimumNumber: number
}

type Type = {}

export const patchGroups = async ({
  conditionId,
  groupId,
  name,
  isEssential,
  isMultiLecture,
  maximumNumber,
  minimumNumber,
}: Props) => {
  return await commonAxios('PATCH')(`api/v1/lecture-conditions/${conditionId}/lecture-groups/${groupId}`, {
    name,
    is_essential: isEssential,
    is_multi_lecture: isMultiLecture,
    maximum_number: maximumNumber,
    minimum_number: minimumNumber,
  }).then((res) => {
    const response = camelizeKey(res?.data) as CommonResponseType<Type>
    return response
  })
}
