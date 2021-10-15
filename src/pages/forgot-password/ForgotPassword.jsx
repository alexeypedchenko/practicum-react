import { useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom'
import Form from '../../components/form/Form'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { canResetPassword, selectAuth } from '../../store/slices/authSlice'

const ForgotPassword = () => {
  const dispatch = useDispatch()
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
    dispatch(canResetPassword({email}))
      .unwrap()
      .then(({success}) => {
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
