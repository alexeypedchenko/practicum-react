import { useEffect, FC } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'
import { IModalProps } from '../../../types/types'

const modalContainer = document.getElementById('modal') as HTMLDivElement

const Modal: FC<IModalProps> = ({ title, children, close, classes }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModalByEscape)
    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
    // eslint-disable-next-line
  }, [])

  const closeModalByEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close()
    }
  }

  return ReactDOM.createPortal((
    <div className={styles.modal}>
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

export default Modal
