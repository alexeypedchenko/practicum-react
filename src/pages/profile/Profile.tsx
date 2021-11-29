import { FC, ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../../components/form/Form'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Profile.module.css'
import { useUnwrapAsyncThunk, useSelector } from '../../hooks/storeHooks'
import { updateUser, selectAuth } from '../../store/slices/auth/authSlice'
import { IInput } from '../../types/types'

const Profile: FC = () => {
  const unwrapAsyncThunk = useUnwrapAsyncThunk()
  const [values, setValues] = useState({name: '', email: '', password: ''})
  const [disabled, setDisabled] = useState<any>({name: true, email: true, password: true})
  const {request, user} = useSelector(selectAuth)

  useEffect(() => {
    const {name, email} = user
    setValues({
      ...values,
      name,
      email
    })
    // eslint-disable-next-line
  }, [])

  const userChanged = useCallback(() => {
    return (
      (JSON.stringify(user) !== JSON.stringify({email: values.email, name: values.name}))
      || !!values.password.length
    )
  }, [user, values])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: IInput = event.target
    setValues({...values, [name]: value})
  }

  const onDisabled = (name: string) => {
    setDisabled({...disabled, [name]: !disabled[name]})
  }

  const handleUpdateUser = () => {
    unwrapAsyncThunk(updateUser(values)).then(({user}) => {
      const {name, email} = user
      setValues({
        name,
        email,
        password: '',
      })
    })
  }

  const resetChanges = () => {
    setValues({
      name: user.name,
      email: user.email,
      password: '',
    })
  }

  return (
    <div className={`${styles.profile} container`}>
      <Sidebar />
      {request ? (
        <p className="text text_type_main-medium">
          Загрузка...
        </p>
      ) : (
        <div className={styles.form}>
          <Form>
            <Input
              type="text"
              value={values.name}
              disabled={disabled.name}
              placeholder="Имя"
              onChange={onChange}
              name="name"
              icon={disabled.name ? 'EditIcon' : 'CheckMarkIcon'}
              onIconClick={() => {onDisabled('name')}}
            />
            <Input
              type="email"
              value={values.email}
              disabled={disabled.email}
              placeholder="E-mail"
              onChange={onChange}
              name="email"
              icon={disabled.email ? 'EditIcon' : 'CheckMarkIcon'}
              onIconClick={() => {onDisabled('email')}}
            />
            <Input
              type={disabled.password ? 'password' : 'text'}
              value={values.password}
              disabled={disabled.password}
              placeholder="Пароль"
              onChange={onChange}
              name="password"
              icon={disabled.password ? 'EditIcon' : 'CheckMarkIcon'}
              onIconClick={() => {onDisabled('password')}}
            />
          </Form>
          {userChanged() && (
            <div className="mt-6" style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button type="secondary" onClick={resetChanges}>
                Отмена
              </Button>
              <Button onClick={handleUpdateUser}>
                Сохранить
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile
