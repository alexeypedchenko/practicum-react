import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Checkout from '../checkout/Checkout'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerConstructor.module.css'
import {BURGER_INGREDIENT} from '../../utils/shapes'

const BurgerConstructor = ({ data }) => {
  console.log('data:', data)
  const [buns, setBuns] = useState([])
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    setBuns(data.filter((el) => el.type === 'bun'))
    setIngredients(data.filter((el) => el.type !== 'bun'))
  }, [data])

  return (
    <div>
      <div className={`${styles.constructor} mb-10`}>
        {buns.length && buns[0] && (
          <div className={`${styles.item} pl-9`}>
            <ConstructorElement
              type="top"
              thumbnail={buns[0].image}
              text={buns[0].name}
              price={buns[0].price}
              isLocked={true}
            />
          </div>
        )}
        <div className={`${styles.list} custom-scroll`}>
          {ingredients.map((item, index) => (
            <div
              className={`${styles.item} pr-2`}
              key={index}
            >
              <div className={`${styles.icon} mr-2`}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                thumbnail={item.image}
                text={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
        {buns.length && buns[1] && (
          <div className={`${styles.item} pl-9`}>
            <ConstructorElement
              type="bottom"
              thumbnail={buns[1].image}
              text={buns[1].name}
              price={buns[1].price}
              isLocked={true}
            />
          </div>
        )}
      </div>
      <Checkout />
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(BURGER_INGREDIENT.isRequired).isRequired
}

export default BurgerConstructor
