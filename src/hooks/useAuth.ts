import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken !== 'TEST') {
      alert('권한이 필요합니다.')
      navigate('/admin')
    }
  }, [])
}
