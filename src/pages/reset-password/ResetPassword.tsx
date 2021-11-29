import { FC, useState, ChangeEvent } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom'
import Form from '../../components/form/Form'
import { useAuth } from '../../hooks/useAuth'
import { useUnwrapAsyncThunk, useSelector } from '../../hooks/storeHooks'
import { resetPassword, selectAuth } from '../../store/slices/auth/authSlice'
import { IInput, IStringObject } from '../../types/types'

const ResetPassword: FC = () => {
  const unwrapAsyncThunk = useUnwrapAsyncThunk()
  const history = useHistory()
  const [values, setValues] = useState({code: '', password: ''})
  const [visiblePassword, setVisiblePassword] = useState(false)
  const {request, passwordReset, error} = useSelector(selectAuth)
  const {isAuth, from} = useAuth()

  if (isAuth || !passwordReset) {
    return (
      <Redirect to={ from || '/' }/>
    )
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: IInput = event.target
    setValues({...values, [name]: value})
  }

  const handleSubmit = () => {
    const data: IStringObject = {
      password: values.password,
      token: values.code
    }
    unwrapAsyncThunk(resetPassword(data)).then(({success}) => {
      if (success) history.push('/login')
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
        button="Сохранить"
        load={request}
        onSubmit={handleSubmit}
        info={info}
      >
        <Input
          type={visiblePassword ? 'text' : 'password'}
          value={values.password}
          placeholder="Введите новый пароль"
          onChange={onChange}
          icon={visiblePassword ? 'HideIcon' : 'ShowIcon'}
          onIconClick={() => setVisiblePassword(!visiblePassword)}
          name="password"
          error={!!error}
        />
        <Input
          type="text"
          value={values.code}
          placeholder="Введите код из письма"
          onChange={onChange}
          name="code"
          error={!!error}
          errorText={error ? error : ''}
        />
      </Form>
    </div>
  )
}

export default ResetPassword
