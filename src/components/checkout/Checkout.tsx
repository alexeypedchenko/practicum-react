import { FC } from 'react'
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
import { ICheckoutProps } from '../../types/types'
import { useUnwrapAsyncThunk } from '../../hooks/storeHooks';

const Checkout: FC<ICheckoutProps> = ({ totalPrice, orderList }) => {
  const history = useHistory()
  const unwrapAsyncThunk = useUnwrapAsyncThunk()

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

    if (orderList && orderList.length > 1 && bun) {
      unwrapAsyncThunk(fetchOrder({ingredients: orderList})).then(({success}) => {
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
          <OrderDetails number={order.number} name={order.name} />
        </Modal>
      )}
    </div>
  )
}

export default Checkout
