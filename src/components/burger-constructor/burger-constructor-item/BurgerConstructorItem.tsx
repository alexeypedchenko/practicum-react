import { FC, useRef } from 'react'
import styles from './BurgerConstructorItem.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop, XYCoord } from 'react-dnd'
// redux
import { useDispatch } from 'react-redux'
import { changeItemsPosition } from '../../../store/slices/burgerConstructorSlice'
import { IBurgerConstructorItemProps } from '../../../types/types'

const BurgerConstructorItem: FC<IBurgerConstructorItemProps> = ({ item, icon, handleClose, isLocked, type, index }) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement> (null)
  const [, drop] = useDrop({
    accept: 'constructorItem',
    hover(item: {index: number | undefined}, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex: number | undefined = index
      if (dragIndex === hoverIndex) return
      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset: XYCoord | null = monitor.getClientOffset()
      if (!dragIndex || !hoverIndex || !clientOffset) return
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

export default BurgerConstructorItem
