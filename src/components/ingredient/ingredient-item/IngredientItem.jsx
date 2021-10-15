import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientItem.module.css'
import { BURGER_INGREDIENT } from '../../../utils/shapes'
import { getId } from '../../../utils/utils'
import { useDragged } from '../../../hooks/useDragged'
// redux
import { useDispatch } from 'react-redux'
import {
  addIngridient,
  addBun
} from '../../../store/slices/burgerConstructorSlice'

const IngredientItem = ({ item, count }) => {
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

  const borderColor = isDragging ? 'lime' : ''

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
      {count[item._id] && (
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

IngredientItem.propTypes = {
  item: BURGER_INGREDIENT.isRequired,
  count: PropTypes.objectOf(PropTypes.number.isRequired),
}

export default IngredientItem
