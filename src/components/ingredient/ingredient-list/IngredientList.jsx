import React from 'react'
import PropTypes from 'prop-types'
import IngredientItem from '../ingredient-item/IngredientItem'
import styles from './IngredientList.module.css'
import { BURGER_INGREDIENT } from '../../../utils/shapes'

const IngredientList = ({ id, title, list, count }) => {
  return (
    <div id={id} className="mb-10">
      <h3 className="text text_type_main-medium mb-6">
        {title}
      </h3>
      <div className={`${styles.list} pl-4 pr-4`}>
        {list.map((item, index) => (
          <IngredientItem
            key={item._id}
            count={count}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

IngredientList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(BURGER_INGREDIENT.isRequired),
  count: PropTypes.objectOf(PropTypes.number.isRequired),
}

export default IngredientList
