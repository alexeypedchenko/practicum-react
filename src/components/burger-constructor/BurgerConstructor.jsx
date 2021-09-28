import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Checkout from '../checkout/Checkout'
import { useDropped } from '../../hooks/useDropped'
import BurgerConstructorPreview from './burger-constructor-preview/BurgerConstructorPreview'
import BurgerConstructorItem from './burger-constructor-item/BurgerConstructorItem'
import styles from './BurgerConstructor.module.css'
// redux
import {
  removeIngredient,
  selectBurgerConstructor,
} from '../../store/slices/burgerConstructorSlice'

const BurgerConstructor = () => {
  const { ingredients, bun } = useSelector(selectBurgerConstructor)
  const dispatch = useDispatch()

  const {
    drop: ingredientDrop,
    canDrop: ingredientCanDrop,
    isOver: ingredientIsOver,
  } = useDropped(['main', 'sauce'])
  const {
    drop: bunTopDrop,
    canDrop: bunTopCanDrop,
    isOver: bunTopIsOver,
  } = useDropped(['bun'])
  const {
    drop: bunBottomDrop,
    canDrop: bunBottomCanDrop,
    isOver: bunBottomIsOver,
  } = useDropped(['bun'])

  const {totalPrice, orderList} = useMemo(()=> {
    const totalPrice = ingredients.reduce((acc, val) => acc + val.price, 0) + (bun?.price * 2 || 0)
    const orderList = ingredients.map((ingredient) => ingredient._id)
    if (bun) {
      orderList.push(bun._id)
    }
    return {
      totalPrice,
      orderList,
    }
  }, [ingredients, bun])

  return (
    <div>
      <div className={`${styles.constructor} mb-10`}>
        <div ref={bunTopDrop} className="pl-9">
          {bun ? (
            <BurgerConstructorItem
              type="top"
              item={bun}
              isLocked={true}
            />
          ) : (
            <BurgerConstructorPreview
              canDrop={bunTopCanDrop}
              isOver={bunTopIsOver}
              type="top"
              text={bunTopCanDrop && bunTopIsOver ? 'Можно бросать 👍' : 'Перетащите булку'}
            />
          )}
        </div>

        <div ref={ingredientDrop} className={`${styles.list} custom-scroll`}>
          {!ingredients.length && (
            <BurgerConstructorPreview
              canDrop={ingredientCanDrop}
              isOver={ingredientIsOver}
              text={ingredientCanDrop && ingredientIsOver ? 'Можно бросать 👍' : 'Перетащите ингредиент или соус'}
              classes="ml-9"
            />
          )}
          {ingredients.map((item, index) => (
            <BurgerConstructorItem
              key={item.id}
              item={item}
              index={index}
              icon={true}
              handleClose={() => dispatch(removeIngredient(item.id))}
            />
          ))}
        </div>

        <div ref={bunBottomDrop} className="pl-9">
          {bun ? (
            <BurgerConstructorItem
              type="bottom"
              item={bun}
              isLocked={true}
            />
          ) : (
            <BurgerConstructorPreview
              canDrop={bunBottomCanDrop}
              isOver={bunBottomIsOver}
              type="bottom"
              text={bunBottomCanDrop && bunBottomIsOver ? 'Можно бросать 👍' : 'Перетащите булку'}
            />
          )}
        </div>
      </div>
      <Checkout totalPrice={totalPrice} orderList={orderList} />
    </div>
  )
}

export default BurgerConstructor
