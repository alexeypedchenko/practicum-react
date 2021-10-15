import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { selectAuth } from '../../store/slices/authSlice'

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector(selectAuth)
  return (
    <Route
      {...rest}
      render={({ location }) => !!user.name ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      )}
    />
  )
}

export default ProtectedRoute
