import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IngredientDetails from '../ingredient-details/IngredientDetails'
import Modal from '../../modal/modal/Modal'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientItem.module.css'
import {BURGER_INGREDIENT} from '../../../utils/shapes'

const IngredientItem = ({ item, count }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={styles.item} onClick={() => setShowModal(true)}>
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
      {showModal && (
        <Modal
          setVisible={setShowModal}
          title="Детали ингредиента"
          classes="pt-10 pb-15"
        >
          <IngredientDetails details={item} />
        </Modal>
      )}
    </div>
  )
}

IngredientItem.propTypes = {
  item: PropTypes.objectOf(BURGER_INGREDIENT.isRequired).isRequired,
  count: PropTypes.number.isRequired
}

export default IngredientItem
