import { FC } from 'react'
import styles from './Ingredient.module.css'
import IngredientDetails from '../../components/ingredient/ingredient-details/IngredientDetails'

const Ingredients: FC = () => {
  return (
    <div className={styles.ingredient}>
      <IngredientDetails />
    </div>
  )
}

export default Ingredients
