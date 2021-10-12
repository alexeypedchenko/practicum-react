import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './IconButton.module.css'
const IconButton = ({ icon, children, path }) => {
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

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool,
}

export default IconButton
