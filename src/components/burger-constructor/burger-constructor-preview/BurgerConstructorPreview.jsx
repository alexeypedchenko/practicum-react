import React from 'react'
import PropTypes from 'prop-types'
import styles from './BurgerConstructorPreview.module.css'

const BurgerConstructorPreview = ({ canDrop, isOver, text, type, classes }) => {
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

BurgerConstructorPreview.propTypes = {
  canDrop: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  text: PropTypes.string,
  classes: PropTypes.string,
  type: PropTypes.string,
}

export default BurgerConstructorPreview
