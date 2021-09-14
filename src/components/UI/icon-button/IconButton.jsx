import React from 'react'
import PropTypes from 'prop-types';
import styles from './IconButton.module.css'

const IconButton = ({ active, icon, children }) => {
  return (
    <button className={`
      ${active ? styles.active : ''}
      ${styles.button}
      pl-5 pr-5 pt-4 pb-4
      text text_type_main-default
    `}>
      <span className={`${styles.icon} mr-2`}>
        {icon}
      </span>
      {children}
    </button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  active: PropTypes.bool,
}

export default IconButton
