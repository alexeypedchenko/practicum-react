import React from 'react'
import PropTypes from 'prop-types'
import IngredientItem from '../ingredient-item/IngredientItem'
import styles from './IngredientList.module.css'

const IngredientList = ({ id, title, list }) => {
  return (
    <div id={id} className="mb-10">
      <h3 className="text text_type_main-medium mb-6">
        {title}
      </h3>
      <div className={`${styles.list} pl-4 pr-4`}>
        {list.map((item, index) => (
          <IngredientItem
            key={item.name}
            item={item}
            count={index % 3 === 0 ? 1 : 0}
          />
        ))}
      </div>
    </div>
  )
}

IngredientList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
}

export default IngredientList
