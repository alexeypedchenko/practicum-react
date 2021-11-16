import { FC, useEffect, useMemo } from 'react'
import styles from './OrderInfo.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from '../../hooks/storeHooks'
import { clearOrder, fetchOrderInfo, selectOrder } from '../../store/slices/orderSlice'
import { useIngredients } from '../../hooks/useIngredients'
import { IBurgerIngredient } from '../../types/types'
import { getDate, getTranslate } from '../../utils/utils'

const OrderInfo: FC = () => {
  // TODO сделать очистку перед открытием
  const { id }: { id: string} = useParams()
  const dispatch = useDispatch()
  const { info } = useSelector(selectOrder)
  const allIngredients = useIngredients()

  useEffect(() => {
    dispatch(clearOrder())
    dispatch(fetchOrderInfo(id))
  }, [])

  const ingredients = useMemo(() => {
    const arr: IBurgerIngredient[] = []
    info?.ingredients.forEach((ingredient) => {
      const item = allIngredients.find((item) => item._id === ingredient)
      if (item?.type === 'bun' && arr.includes(item)) {
        return
      }
      if (item) {
        arr.push(item)
      }
    })
    return arr
  }, [allIngredients, info])

  const totalPrice = useMemo(() => {
    return ingredients.reduce((acc, val) => {
      return acc+= val.type === 'bun' ? val.price * 2 : val.price
    }, 0)
  }, [ingredients])

  if (!info) {
    return (
      <div className={styles.order}>
        <p className="text text_type_main-medium mb-3">
          Получаем информацию о заказе...
        </p>
      </div>
    )
  }

  return (
    <div className={styles.order}>
      <p className={`${styles.number} text text_type_digits-default mb-10`}>
      #{id}
      </p>
      <p className="text text_type_main-medium mb-3">
        {info?.name}
      </p>
      <p className="text text_type_main-default color-success mb-15">
        {info && getTranslate[info.status]}
      </p>

      <p className="text text_type_main-medium mb-6">
        Состав:
      </p>
      <ul className={`${styles.list} custom-scroll`}>
        {ingredients.map((ingredient, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.imageWrap}>
              <img className={styles.image} src={ingredient.image_mobile} />
            </div>
            <p style={{width: '100%'}} className="text text_type_main-default ml-4 mr-4">
              {ingredient.name}
            </p>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">
                {ingredient.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {info && getDate(info.updatedAt)}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
