import { FC } from 'react'
import Navbar from '../navbar/Navbar'
import IconButton from '../UI/icon-button/IconButton'
import { Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import { Link } from 'react-router-dom'

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <Navbar />
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <IconButton icon={<ProfileIcon type="primary" />} path="/profile">
          Личный кабинет
        </IconButton>
      </div>
    </header>
  )
}

export default AppHeader
