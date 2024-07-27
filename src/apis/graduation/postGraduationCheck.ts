import { REQUEST_URL } from 'apis/common'
import axios from 'axios'

type Props = {
  year: number
  tech: '심화' | '일반'
}

export const postGraduationCheck = async (params: Props, file: any) => {
  return await axios
    .post(`${REQUEST_URL}/api/v1/graduation-check?year=${params.year}&tech=${params.tech}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
}
