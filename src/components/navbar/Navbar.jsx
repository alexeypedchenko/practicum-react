import React from 'react'
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IconButton from '../UI/icon-button/IconButton'
import styles from './Navbar.module.css'

const Navbar = () => {
  const links = [
    { id: 0, name: 'Конструктор', icon: <BurgerIcon type="primary" />, path: '/', },
    { id: 1, name: 'Лента заказов', icon: <ListIcon type="primary" />, path: '', },
  ]
  return (
    <nav className={styles.navbar}>
      {links.map((link, index) => (
        <IconButton
          key={link.id}
          icon={link.icon}
          path={link.path}
        >
          {link.name}
        </IconButton>
      ))}
    </nav>
  )
}

export default Navbar
