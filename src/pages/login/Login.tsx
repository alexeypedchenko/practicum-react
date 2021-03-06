import { FC, ChangeEvent, useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect } from 'react-router-dom'
import Form from '../../components/form/Form'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch, useSelector } from '../../hooks/storeHooks'
import { authUser, selectAuth } from '../../store/slices/auth/authSlice'
import { IInput, IStringObject } from '../../types/types'

const Login: FC = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({email: '', password: ''})
  const [visiblePassword, setVisiblePassword] = useState(false)
  const {request, error} = useSelector(selectAuth)
  const {isAuth, from} = useAuth()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: IInput = event.target
    setValues({...values, [name]: value})
  }

  const handleSubmit = () => {
    const user: IStringObject = {
      email: values.email,
      password: values.password,
    }
    dispatch(authUser(user))
  }

  if (isAuth) {
    return (
      <Redirect to={ from || '/' }/>
    )
  }

  const info = (<>
    <p className="text text_type_main-small text_color_inactive mb-4">
      Вы — новый пользователь?
      <Link className="link" to="/register">Зарегистрироваться</Link>
    </p>
    <p className="text text_type_main-small text_color_inactive">
      Забыли пароль? Восстановить пароль
      <Link className="link" to="/forgot-password">Восстановить пароль</Link>
    </p>
  </>)

  return (
    <div className="container flex-center">
      <Form
        title="Вход"
        button="Войти"
        load={request}
        onSubmit={handleSubmit}
        info={info}
      >
        <Input
          type="email"
          value={values.email}
          placeholder="E-mail"
          onChange={onChange}
          name="email"
          error={!!error}
        />
        <Input
          type={visiblePassword ? 'text' : 'password'}
          value={values.password}
          placeholder="Пароль"
          onChange={onChange}
          icon={visiblePassword ? 'HideIcon' : 'ShowIcon'}
          onIconClick={() => setVisiblePassword(!visiblePassword)}
          name="password"
          error={!!error}
          errorText={error ? error : ''}
        />
      </Form>
    </div>
  )
}

export default Login
