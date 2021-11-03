import { FC } from 'react'
import IngredientItem from '../ingredient-item/IngredientItem'
import styles from './IngredientList.module.css'
import { IIngredientListProps } from '../../../types/types'

const IngredientList: FC<IIngredientListProps> = ({ id, title, list, count }) => {
  return (
    <div id={id} className="mb-10">
      <h3 className="text text_type_main-medium mb-6">
        {title}
      </h3>
      <div className={`${styles.list} pl-4 pr-4`}>
        {list.map((item) => (
          <IngredientItem
            key={item._id}
            count={count}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export default IngredientList
