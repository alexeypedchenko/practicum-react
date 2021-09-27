import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/modal/Modal'
import OrderDetails from '../order-details/OrderDetails'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Checkout.module.css'
import { useDisclosure } from '../../hooks/useDisclosure'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrder, selectOrder } from '../../store/slices/orderSlice'
import { removeAllIngredients } from '../../store/slices/burgerConstructorSlice'

const Checkout = ({totalPrice, orderList}) => {
  const {isOpen, open, close} = useDisclosure(false, {
    onClose: () => {
      dispatch(removeAllIngredients())
    }
  })
  const {request, order} = useSelector(selectOrder)
  const dispatch = useDispatch()

  const sendOder = () => {
    if (orderList.length) dispatch(fetchOrder(orderList))
  }

  useEffect(() => {
    if (order.success) {
      open()
    }
  }, [order])

  return (
    <div className={styles.checkout}>
      <div className={`${styles.price} mr-10`}>
        <span className="text text_type_digits-medium mr-2">
          {totalPrice || 0}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={sendOder}
      >
        {request ? 'Обрабатываем...' : 'Оформить заказ'}
      </Button>

      {isOpen && (
        <Modal
          close={close}
          classes="pt-15 pb-30"
        >
          <OrderDetails details={order} />
        </Modal>
      )}
    </div>
  )
}

Checkout.propTypes = {
  totalPrice: PropTypes.number,
  orderList: PropTypes.arrayOf(PropTypes.string),
}

export default Checkout
