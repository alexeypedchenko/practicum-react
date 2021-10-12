import React from 'react'
import styles from './Ingredient.module.css'
import IngredientDetails from '../../components/ingredient/ingredient-details/IngredientDetails'

const Ingredients = () => {
  return (
    <div className={styles.ingredient}>
      <IngredientDetails />
    </div>
  )
}

export default Ingredients
