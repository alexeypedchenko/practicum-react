import { FC, useState, ChangeEvent } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect } from 'react-router-dom'
import Form from '../../components/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, selectAuth } from '../../store/slices/authSlice'
import { useAuth } from '../../hooks/useAuth'
import { IInput, IStringObject } from '../../types/types'

const Register: FC = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({name: '', email: '', password: ''})
  const [visiblePassword, setVisiblePassword] = useState(false)
  const {request, error} = useSelector(selectAuth)
  const {isAuth, from} = useAuth()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: IInput = event.target
    setValues({...values, [name]: value})
  }

  const handleSubmit = () => {
    const user: IStringObject = {
      name: values.name,
      email: values.email,
      password: values.password,
    }
    // @ts-ignore: Unreachable code error
    dispatch(registerUser(user))
  }

  if (isAuth) {
    return (
      <Redirect to={ from || '/' }/>
    )
  }

  const info = (
    <p className="text text_type_main-small text_color_inactive mb-4">
      Уже зарегистрированы?
      <Link className="link" to="/login">Войти</Link>
    </p>
  )

  return (
    <div className="container flex-center">
      <Form
        title="Регистрация"
        button="Зарегистрироваться"
        load={request}
        onSubmit={handleSubmit}
        info={info}
      >
        <Input
          type="text"
          value={values.name}
          placeholder="Имя"
          onChange={onChange}
          name="name"
          error={!!error}
        />
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

export default Register

