import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientsItem.module.css'

const IngredientsItem = ({item, count}) => {
  return (
    <div className={styles.item}>
      {count > 0 &&
        <div className={styles.counter}>
          <Counter count={1} size="default" />
        </div>
      }
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
    </div>
  )
}

IngredientsItem.propTypes= {
  item: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired
}

export default IngredientsItem
