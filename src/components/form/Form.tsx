import { FC, FormEvent } from 'react'
import styles from './Form.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { IFormProps } from '../../types/types'

const Form: FC<IFormProps> = ({ children, title, button, load, info, onSubmit }) => {

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
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

export default Form
