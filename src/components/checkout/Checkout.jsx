import PropTypes from 'prop-types'
import Modal from '../modal/modal/Modal'
import OrderDetails from '../order-details/OrderDetails'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Checkout.module.css'
import { useDisclosure } from '../../hooks/useDisclosure'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrder, selectOrder } from '../../store/slices/orderSlice'
import { removeAllIngredients, selectBurgerConstructor } from '../../store/slices/burgerConstructorSlice'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const Checkout = ({ totalPrice, orderList }) => {
  const history = useHistory()

  const { isAuth } = useAuth()
  const { isOpen, open, close } = useDisclosure(false, {
    onClose: () => {
      dispatch(removeAllIngredients())
    }
  })
  const { request, order } = useSelector(selectOrder)
  const { bun } = useSelector(selectBurgerConstructor)
  const dispatch = useDispatch()

  const sendOder = () => {
    if (!isAuth) {
      history.push('/login')
      return
    }
    if (orderList.length > 1 && bun) {
      dispatch(fetchOrder({ingredients: orderList}))
        .unwrap()
        .then(({success}) => {
          if (success) {
            open()
          }
        })
    }
  }

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
          <OrderDetails number={order.order.number} name={order.name} />
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
