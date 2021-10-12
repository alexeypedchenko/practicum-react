import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getUser, selectAuth } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)
  const location = useLocation()
  const from = location.state?.from?.pathname

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken')
    const accessToken = localStorage.getItem('accessToken')
    if (refreshToken && accessToken) {
      dispatch(getUser(accessToken))
    }
    // eslint-disable-next-line
  }, [])

  return {
    user,
    from,
    isAuth: !!user.name,
  }
}
