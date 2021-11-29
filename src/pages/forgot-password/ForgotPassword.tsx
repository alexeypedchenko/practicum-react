import { FC, useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom'
import Form from '../../components/form/Form'
import { useAuth } from '../../hooks/useAuth'
import { useUnwrapAsyncThunk, useSelector } from '../../hooks/storeHooks'
import { canResetPassword, selectAuth } from '../../store/slices/auth/authSlice'

const ForgotPassword: FC = () => {
  const unwrapAsyncThunk = useUnwrapAsyncThunk()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const {request, error} = useSelector(selectAuth)
  const {isAuth, from} = useAuth()

  if (isAuth) {
    return (
      <Redirect to={ from || '/' }/>
    )
  }

  const handleSubmit = () => {
    unwrapAsyncThunk(canResetPassword({email})).then(({success}) => {
      if (success) history.push('/reset-password')
    })
  }

  const info = (
    <p className="text text_type_main-small text_color_inactive mb-4">
      Вспомнили пароль?
      <Link className="link" to="/login">Войти</Link>
    </p>
  )

  return (
    <div className="container flex-center">
      <Form
        title="Восстановление пароля"
        button="Восстановить"
        load={request}
        onSubmit={handleSubmit}
        info={info}
      >
        <Input
          type="email"
          value={email}
          placeholder="Укажите e-mail"
          onChange={e => setEmail(e.target.value)}
          name="email"
          error={!!error}
          errorText={error ? error : ''}
        />
      </Form>
    </div>
  )
}

export default ForgotPassword
