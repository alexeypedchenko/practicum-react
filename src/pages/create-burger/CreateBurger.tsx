import { FC } from 'react'
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const CreateBurger: FC = () => {
  return (
    <>
      <h1 style={{ width: '100%' }} className="mb-5 text text_type_main-large">
        Соберите бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </>
  )
}

export default CreateBurger
