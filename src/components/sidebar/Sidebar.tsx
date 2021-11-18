import { FC } from 'react'
import { useDispatch } from '../../hooks/storeHooks'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { logout } from '../../store/slices/authSlice'

const ProfileNav: FC = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.sidebar}>
      <NavLink
        to="/profile"
        exact
        activeClassName={styles.active}
        className={` ${styles.button} text text_type_main-medium`}
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        exact
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
  )
}

export default ProfileNav
