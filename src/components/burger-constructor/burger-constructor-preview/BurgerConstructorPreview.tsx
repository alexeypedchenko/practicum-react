import { FC } from 'react'
import styles from './BurgerConstructorPreview.module.css'
import { IBurgerConstructorPreviewProps } from '../../../types/types'

const BurgerConstructorPreview: FC<IBurgerConstructorPreviewProps> = ({ canDrop, isOver, text, type, classes }) => {
  return (
    <div className={`
      ${styles.preview}
      ${type === 'top' ? styles.previewTop : type === 'bottom' ? styles.previewBottom : ''}
      ${canDrop ? styles.previewCanDrop : ''}
      ${isOver ? styles.previewIsOver : ''}
      ${classes}
    `}>
      <p className="text text_type_main-default">
        {text}
      </p>
    </div>
  )
}

export default BurgerConstructorPreview
