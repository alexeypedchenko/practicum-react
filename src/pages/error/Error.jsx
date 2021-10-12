import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.css'

const Error = () => {
  return (
    <div className={styles.error}>
      <p className="text text_type_main-large mt-4 mb-8">
        Page not found - 404
      </p>
      <p className="text text_type_main-default">
        go to <Link className="link" to="/">home</Link>
      </p>
    </div>
  )
}

export default Error
