import { REQUEST_URL } from 'apis/common'
import axios from 'axios'

export const postTimetable = async (file: any) => {
  return await axios
    .post(`${REQUEST_URL}/api/v1/lecture-identifications`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
}
