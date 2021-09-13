import React from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Checkout.module.css'

const Checkout = () => {
  return (
    <div className={styles.checkout}>
      <div className={`${styles.price} mr-10`}>
        <span className="text text_type_digits-medium mr-2">
          610
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
}

export default Checkout
