import { FC } from 'react'
import { useIngredients } from '../../hooks/useIngredients'
import { IOrderTapeProps } from '../../types/types'
import Order from '../order/Order'
import styles from './OrderTape.module.css'

const OrderTape: FC<IOrderTapeProps> = ({orders}) => {
  const allIngredients = useIngredients()

  return (
    <div className={`${styles.tape} custom-scroll`}>
      {orders && orders.map((order, index) => (
        <Order allIngredients={allIngredients} {...order} key={index} />
      ))}
    </div>
  )
}

export default OrderTape
