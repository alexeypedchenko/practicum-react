import { FC, useState, useEffect, useRef, useMemo } from 'react'
import Tabs from '../UI/tabs/Tabs'
import IngredientList from '../ingredient/ingredient-list/IngredientList'
import {
  getGroupedObjectByKey,
  getTranslate,
  getVisibleNodeOnScroll,
  scrollTo
} from '../../utils/utils'
import styles from './BurgerIngredients.module.css'
// redux
import { useSelector, useDispatch } from '../../hooks/storeHooks'
import { selectIngredients } from '../../store/slices/ingredients/ingredientsSlice'
import { selectBurgerConstructor } from '../../store/slices/burger-constructor/burgerConstructorSlice'
import { IBurgerIngredient, ITabNode } from '../../types/types'

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState('')
  const [tabs, setTabs] = useState<Array<string>>([])
  const burgerIngredientsList = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const { ingredients } = useSelector(selectIngredients)
  const { bun, ingredients: constructorIngredients } = useSelector(selectBurgerConstructor)

  const groupedIngredients = useMemo(() => {
    const groupData = getGroupedObjectByKey<IBurgerIngredient>(ingredients, 'type')
    setTabs(Object.keys(groupData).map((key) => getTranslate[key]))
    return groupData
  }, [ingredients])

  const ingredientsCount = useMemo(() => {
    const list: any = constructorIngredients.reduce((acc: any, val: IBurgerIngredient) => {
      acc[val._id] = (acc[val._id] || 0) + 1
      return acc;
    }, {})
    if (bun) {
      list[bun._id] = 2
    }
    return list
  }, [constructorIngredients, bun])

  const setActiveTabOnScroll = () => {
    const tabNodes: ITabNode[] = tabs.map((tab) => ({ name: tab, $el: document.getElementById(getTranslate[tab]) }))
    const tab: ITabNode | undefined = getVisibleNodeOnScroll(tabNodes, burgerIngredientsList.current)
    if (tab) {
      setCurrentTab(tab.name)
    }
  }
  const showActiveTab = (tab: string) => {
    const tabElement: HTMLElement | null = document.getElementById(getTranslate[tab])
    if (tabElement && burgerIngredientsList.current) {
      scrollTo(tabElement, burgerIngredientsList.current)
    }
  }

  useEffect(() => {
    const list: HTMLDivElement | null = burgerIngredientsList.current
    if (list) {
      list.addEventListener('scroll', setActiveTabOnScroll)
    }
    return () => {
      if (list) {
        list.removeEventListener('scroll', setActiveTabOnScroll)
      }
    }
    // eslint-disable-next-line
  }, [burgerIngredientsList, tabs])

  return (
    <div className={styles.container}>
      <Tabs
        tabs={tabs}
        currentTab={currentTab || tabs[0]}
        setCurrentTab={showActiveTab}
      />
      <div
        ref={burgerIngredientsList}
        className={`${styles.list} custom-scroll mt-10`}
      >
        {tabs.map((tab) => (
          <IngredientList
            id={getTranslate[tab]}
            key={tab}
            title={tab}
            count={ingredientsCount}
            list={groupedIngredients[getTranslate[tab]]}
          />
        ))}
      </div>
    </div>
  )
}

export default BurgerIngredients
