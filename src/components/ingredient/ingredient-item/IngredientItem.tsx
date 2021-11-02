import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientItem.module.css'
import { getId } from '../../../utils/utils'
import { useDragged } from '../../../hooks/useDragged'
// redux
import { useDispatch } from 'react-redux'
import {
  addIngridient,
  addBun
} from '../../../store/slices/burgerConstructorSlice'
import { IIngredientItemProps } from '../../../types/types'

const IngredientItem: FC<IIngredientItemProps> = ({ item, count }) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const { isDragging, drag } = useDragged(item, item.type, {
    onDragEnd: () => {
      if (item.type === 'bun') {
        dispatch(addBun({ ...item, id: getId() }))
        return
      }
      dispatch(addIngridient({ ...item, id: getId() }))
    }
  })

  const borderColor: string = isDragging ? 'lime' : ''

  return (
    <Link
      to={{
        pathname: `/ingredients/${item._id}`,
        state: { background: location }
      }}
      ref={drag}
      className={styles.item}
      style={{ borderColor }}
    >
      {count?.[item._id] && (
        <div className={styles.counter}>
          <Counter count={count[item._id]} size="default" />
        </div>
      )}
      <img
        className={`${styles.image} mb-1`}
        src={item.image}
        alt={item.name}
        />
      <div className={`${styles.price} mb-1`}>
        <span className="text text_type_digits-default mr-2">
          {item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`${styles.name} text text_type_main-default`}>
        {item.name}
      </h4>
    </Link>
  )
}

export default IngredientItem
