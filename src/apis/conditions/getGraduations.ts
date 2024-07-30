import { commonAxios, CommonResponseType } from 'apis/common'

type Props = {}

type Type = {
  id: number
  year: number
  tech: '심화' | '일반'
  total_minimum_credit: number
}[]

export const getGraduations = async () => {
  return await commonAxios('GET')('api/v1/conditions', {}).then((res) => {
    const response = res?.data as CommonResponseType<Type>
    return response
  })
}
