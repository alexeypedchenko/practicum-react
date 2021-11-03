import { FC } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './IconButton.module.css'
import { IIconButtonProps } from '../../../types/types'

const IconButton: FC<IIconButtonProps> = ({ icon, path, children }) => {
  const match = useRouteMatch({
    path,
    exact: true
  })

  return (
    <Link
      to={path}
      className={`
        ${match && path ? styles.active : ''}
        ${!path ? styles.disabled : ''}
        ${styles.button}
        pl-5 pr-5 pt-4 pb-4
        text text_type_main-default
      `}
    >
      <span className={`${styles.icon} mr-2`}>
        {icon}
      </span>
      {children}
    </Link>
  )
}

export default IconButton
