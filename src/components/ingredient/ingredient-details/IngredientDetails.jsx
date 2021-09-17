import React from 'react'
import PropTypes from 'prop-types'
import styles from './IngredientDetails.module.css'
import {BURGER_INGREDIENT} from '../../../utils/shapes'

const IngredientDetails = ({ details }) => {
  const list = [
    {id: 0, name: 'Калории,ккал', key: 'calories'},
    {id: 1, name: 'Белки, г', key: 'proteins'},
    {id: 2, name: 'Жиры, г', key: 'fat'},
    {id: 3, name: 'Углеводы, г', key: 'carbohydrates'},
  ]
  return (
    <div className={styles.ingredient}>
      <img className={`${styles.image} mb-4`} src={details.image_large} alt={details.name} />
      <h3 className="text text_type_main-medium mb-8">
        {details.name}
      </h3>
      <ul className={styles.list}>
        {list.map((item) => (
          <li
            className={`${styles.item} text text_color_inactive`}
            key={item.id}
          >
            <span className="text_type_main-default mb-2">
              {item.name}
            </span>
            <span className="text_type_digits-default">
              {details[item.key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  details: PropTypes.objectOf(BURGER_INGREDIENT.isRequired).isRequired
}

export default IngredientDetails
