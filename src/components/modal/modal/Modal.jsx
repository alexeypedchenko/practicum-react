import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'

const modalContainer = document.getElementById('modal')

const Modal = ({ title, children, close, classes }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModalByEscape)
    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  const closeModalByEscape = ({ key }) => {
    if (key === 'Escape') {
      close()
    }
  }

  return ReactDOM.createPortal((
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={`${styles.content} ${classes} pl-10 pr-10`}>
        <div className={styles.head}>
          {title && (
            <div className="text text_type_main-large">
              {title}
            </div>
          )}
          <button className={styles.close} onClick={close}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay close={close} />
    </div>),
    modalContainer
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.string,
  close: PropTypes.func.isRequired,
}

export default Modal
