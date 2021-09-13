import React from 'react'
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor'
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients'
import styles from './ConstructorPage.module.css'

const ConstructorPage = () => {
  return (
    <main className={`${styles.main} container pb-10`}>
      <h1 style={{width: '100%'}} className="mb-5 text text_type_main-large">
        Соберите бургер
      </h1>
      <BurgerConstructor />
      <BurgerIngredients />
    </main>
  )
}

export default ConstructorPage
