import { FC } from 'react'
import { useSelector } from '../../hooks/storeHooks'
import { selectIngredients } from '../../store/slices/ingredients/ingredientsSlice'
import { IOrderTapeProps } from '../../types/types'
import Order from '../order/Order'
import styles from './OrderTape.module.css'

const OrderTape: FC<IOrderTapeProps> = ({orders}) => {
  const { ingredients: allIngredients } = useSelector(selectIngredients)

  return (
    <div className={`${styles.tape} custom-scroll`}>
      {orders && orders.map((order, index) => (
        <Order allIngredients={allIngredients} {...order} key={index} />
      ))}
    </div>
  )
}

export default OrderTape
