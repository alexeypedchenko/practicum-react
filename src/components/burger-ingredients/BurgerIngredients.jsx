import React from 'react'
import { mockData } from '../../utils/data'
import Checkout from '../checkout/Checkout'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'

const BurgerIngredients = () => {
  console.log('mockData:', mockData)
  const getPosition = (index, length) => {
    if (index === 0) {
      return 'top'
    }
    if (index === length - 1) {
      return 'bottom'
    }
    return false
  }
  return (
    <div>
      <div className={`${styles.list} custom-scroll mb-10`}>
        {mockData.map((item, index) =>
          <div
            className={`${styles.item} pr-2`}
            key={item.name}
          >
            {!(index === 0 || index === mockData.length - 1) &&
              <div className={`${styles.icon} mr-2`}>
                <DragIcon type="primary" />
              </div>
            }
            <ConstructorElement
              type={getPosition(index, mockData.length)}
              thumbnail={item.image}
              text={item.name}
              price={item.price}
              isLocked={index % 4 === 0}
            />
          </div>
        )}
      </div>
      <Checkout />
    </div>
  )
}

export default BurgerIngredients
