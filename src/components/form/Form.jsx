import React from 'react'
import PropTypes from 'prop-types'
import styles from './Form.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

const Form = ({children, title, button, load, info, onSubmit}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    if (load || (typeof onSubmit !== 'function')) return
    onSubmit()
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {title && (<p className="text text_type_main-medium">{title}</p>)}
        {children}
        {button && (<Button>{load ? 'Обрабатываем...' : button}</Button>)}
      </form>
      {info && (<div className={`${styles.info} mt-20`}>{info}</div>)}
    </>
  )
}

Form.propTypes = {
  title: PropTypes.string,
  button: PropTypes.string,
  load: PropTypes.bool,
  info: PropTypes.node,
  onSubmit: PropTypes.func,
}

export default Form
