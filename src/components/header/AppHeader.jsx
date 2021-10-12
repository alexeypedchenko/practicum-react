import React from 'react'
import Navbar from '../navbar/Navbar'
import IconButton from '../UI/icon-button/IconButton'
import { Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <Navbar />
        <div className={styles.logo}>
          <Logo />
        </div>
        <IconButton icon={<ProfileIcon type="primary" />} path="/profile">
          Личный кабинет
        </IconButton>
      </div>
    </header>
  )
}

export default AppHeader
