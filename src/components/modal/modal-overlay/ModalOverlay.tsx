import { FC } from 'react'
import styles from './ModalOverlay.module.css'

const ModalOverlay: FC<{ close: () => void }> = ({ close }) => {
  return (
    <div className={styles.overlay} onClick={close}>
    </div>
  )
}

export default ModalOverlay
