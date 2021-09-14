import React from 'react'
import PropTypes from 'prop-types'
import BurgerConstructor from '../../burger-constructor/BurgerConstructor'
import BurgerIngredients from '../../burger-ingredients/BurgerIngredients'
import styles from './ConstructorPage.module.css'

const ConstructorPage = ({ data }) => {
  return (
    <main className={`${styles.main} container pb-10`}>
      <h1 style={{ width: '100%' }} className="mb-5 text text_type_main-large">
        Соберите бургер
      </h1>
      <BurgerConstructor data={data} />
      <BurgerIngredients data={data} />
    </main>
  )
}

ConstructorPage.propTypes = {
  data: PropTypes.array.isRequired
}

export default ConstructorPage
