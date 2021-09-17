import React from 'react'
import PropTypes from 'prop-types'
import styles from './ModalOverlay.module.css'

const ModalOverlay = ({ setVisible }) => {
  return (
    <div className={styles.overlay} onClick={() => setVisible(false)}>
    </div>
  )
}

ModalOverlay.propTypes = {
  setVisible: PropTypes.func.isRequired
}

export default ModalOverlay
