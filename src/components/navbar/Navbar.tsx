import { FC } from 'react'
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IconButton from '../UI/icon-button/IconButton'
import styles from './Navbar.module.css'
import { INavbarLink } from '../../types/types'

const Navbar: FC = () => {
  const links: INavbarLink[] = [
    { id: 0, name: 'Конструктор', icon: <BurgerIcon type="primary" />, path: '/', },
    { id: 1, name: 'Лента заказов', icon: <ListIcon type="primary" />, path: '', },
  ]

  return (
    <nav className={styles.navbar}>
      {links.map((link) => (
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
