import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useMemo } from 'react'
import styles from './Order.module.css'
import { IBurgerIngredient, IOrderProps } from '../../types/types'
import { Link, useLocation } from 'react-router-dom'
import { getTranslate, getDate } from '../../utils/utils'

const Order: FC<IOrderProps> = ({ ingredients, name, number, status, updatedAt, allIngredients}) => {
  const maxCount = 6
  const location = useLocation()

  const orderIngredients = useMemo(() => {
    const arr: IBurgerIngredient[] = []
    ingredients.forEach((ingredient) => {
      const item = allIngredients.find((item) => item._id === ingredient)
      if (item?.type === 'bun' && arr.includes(item)) {
        return
      }
      if (item) {
        arr.push(item)
      }
    })
    return arr
  }, [allIngredients, ingredients])

  const totalPrice = useMemo(() => {
    return orderIngredients.reduce((acc, val) => {
      return acc+= val.type === 'bun' ? val.price * 2 : val.price
    }, 0)
  }, [orderIngredients])

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${number}`,
        state: { background: location }
      }}
      className={`${styles.order} p-6 mb-4`}
    >
      <div className={`${styles.head} mb-6`}>
        <p className="text text_type_digits-default">
        #{number}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {getDate(updatedAt)}
        </p>
      </div>
      <p className="text text_type_main-medium">
        {name}
      </p>
      <p className={`text text_type_main-default mb-6 ${status === 'done' ? 'color-success' : ''}`}>
        {getTranslate[status]}
      </p>
      <div className={styles.footer}>
        <div className={styles.images}>
          {orderIngredients.slice(0, maxCount).map((ingredient, index) =>
            <div
              key={index}
              className={styles.imageWrap}
              style={{zIndex: orderIngredients.length - index}}
            >
              {index === maxCount - 1 && orderIngredients.length - maxCount > 0 && (
                <span className={`${styles.count} text text_type_main-default`}>
                  +{orderIngredients.length - maxCount}
                </span>
              )}
              <img className={styles.image} src={ingredient.image_mobile} />
            </div>
          )}
        </div>
        <p className={`${styles.price} text text_type_digits-default`}>
          <span className="mr-2">
          {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  )
}

export default Order
