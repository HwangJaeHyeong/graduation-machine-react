import { commonAxios } from 'apis/common'
import { camelizeKey } from 'utils/camelizeKey'

type Props = {
  id: number
  year: number
  tech: string
}

type Type = {
  totalMinimumCredit: number
  requirements: {
    id: number
    name: string
    minimumCredit: number
  }[]
}

export const getConditionDetails = async ({ id, year, tech }: Props) => {
  return await commonAxios('GET')(`api/v1/conditions/${id}/lecture-conditions?year=${year}&tech=${tech}`, {}).then(
    (res) => {
      const response = camelizeKey(res?.data.data) as Type
      return response
    }
  )
}
