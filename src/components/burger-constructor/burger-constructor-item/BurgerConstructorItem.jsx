import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './BurgerConstructorItem.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
// redux
import { BURGER_INGREDIENT } from '../../../utils/shapes'
import { useDispatch } from 'react-redux'
import { changeItemsPosition } from '../../../store/slices/burgerConstructorSlice'

const BurgerConstructorItem = ({ item, icon, handleClose, isLocked, type, index }) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'constructorItem',
    hover(item, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      dispatch(changeItemsPosition({dragIndex, hoverIndex}))
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'constructorItem',
    item: () => ({ ...item, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`${styles.item} pr-2`}
      style={{ opacity }}
    >
      {icon && (
        <div className="mr-2">
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
        type={type}
        thumbnail={item.image}
        text={`${item.name} ${type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : ''}`}
        price={item.price}
        handleClose={handleClose}
        isLocked={isLocked}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  item: BURGER_INGREDIENT.isRequired,
  icon: PropTypes.bool,
  isLocked: PropTypes.bool,
  type: PropTypes.string,
  handleClose: PropTypes.func,
  index: PropTypes.number,
}

export default BurgerConstructorItem
