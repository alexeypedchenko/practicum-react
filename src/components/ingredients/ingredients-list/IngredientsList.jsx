import React from 'react'
import PropTypes from 'prop-types'
import IngredientsItem from '../ingredients-item/IngredientsItem'
import styles from './IngredientsList.module.css'

const IngredientsList = ({id, title, list}) => {
  return (
    <div id={id} className="mb-10">
      <h3 className="text text_type_main-medium mb-6">
        {title}
      </h3>
      <div className={`${styles.list} pl-4 pr-4`}>
        {list.map((item, index) =>
          <IngredientsItem
            key={item.name}
            item={item}
            count={index % 3 === 0 ? 1 : 0}
          />
        )}
      </div>
    </div>
  )
}

IngredientsList.propTypes= {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
}

export default IngredientsList
