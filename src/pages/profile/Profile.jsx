import React, { useCallback, useEffect, useState } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import Form from '../../components/form/Form'
import styles from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, selectAuth, logout } from '../../store/slices/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({name: '', email: '', password: ''})
  const [disabled, setDisabled] = useState({name: true, email: true, password: true})
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

  const onChange = (event) => {
    const { name, value } = event.target
    setValues({...values, [name]: value})
  }

  const onDisabled = (name) => {
    setDisabled({...disabled, [name]: !disabled[name]})
  }

  const handleUpdateUser = () => {
    dispatch(updateUser(values))
      .unwrap()
      .then(({user}) => {
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

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={`${styles.profile} container`}>
      <div className={styles.sidebar}>
        <NavLink
          to="/profile"
          activeClassName={styles.active}
          className={` ${styles.button} text text_type_main-medium`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          activeClassName={styles.active}
          className={`${styles.button} text text_type_main-medium`}
        >
          История заказов
        </NavLink>
        <button
          className={`${styles.button} text text_type_main-medium`}
          onClick={handleLogout}
        >
          Выход
        </button>

        <p
          className="text text_type_main-default text_color_inactive mt-20"
          style={{opacity: 0.4}}
        >
          В этом разделе вы можете
          <br /> изменить свои персональные данные
        </p>
      </div>
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
