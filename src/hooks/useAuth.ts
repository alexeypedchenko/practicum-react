import { useEffect } from 'react'
import { useDispatch, useSelector } from './storeHooks'
import { useLocation } from 'react-router-dom'
import { getUser, selectAuth } from '../store/slices/auth/authSlice'

interface ILocation {
  state?: Location & {
    from?: Location
  }
}

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)
  const location: ILocation = useLocation()
  const from = location.state?.from?.pathname

  useEffect(() => {
    const refreshToken: string | null = localStorage.getItem('refreshToken')
    const accessToken: string | null = localStorage.getItem('accessToken')
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
