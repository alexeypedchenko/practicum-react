import React, { useState } from 'react'
import Modal from '../modal/modal/Modal'
import OrderDetails from '../order-details/OrderDetails'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Checkout.module.css'

const Checkout = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className={styles.checkout}>
      <div className={`${styles.price} mr-10`}>
        <span className="text text_type_digits-medium mr-2">
          610
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => setShowModal(true)}
      >
        Оформить заказ
      </Button>

      {showModal && (
        <Modal
          setVisible={setShowModal}
          classes="pt-15 pb-30"
        >
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}

export default Checkout
