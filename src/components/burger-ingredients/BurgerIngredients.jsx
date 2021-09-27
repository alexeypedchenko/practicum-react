import React, { useState, useEffect, useRef, useMemo } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { fetchIngredients, selectIngredients } from '../../store/slices/ingredientsSlice'
import { selectBurgerConstructor } from '../../store/slices/burgerConstructorSlice'

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('')
  const [tabs, setTabs] = useState([])
  const burgerIngredientsList = useRef()

  const dispatch = useDispatch()
  const { ingredients } = useSelector(selectIngredients)
  const { bun, ingredients: constructorIngredients } = useSelector(selectBurgerConstructor)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  const groupedIngredients = useMemo(() => {
    const groupData = getGroupedObjectByKey(ingredients, 'type')
    setTabs(Object.keys(groupData).map((key) => getTranslate[key]))
    return groupData
  }, [ingredients])

  const ingredientsCount = useMemo(() => {
    const list = constructorIngredients.reduce((acc, val) => {
      acc[val._id] = (acc[val._id] || 0) + 1
      return acc;
    }, {})
    if (bun) {
      list[bun._id] = 1
    }
    return list
  }, [constructorIngredients, bun])

  const setActiveTabOnScroll = () => {
    const tabNodes = tabs.map((tab) => ({ name: tab, $el: document.getElementById(getTranslate[tab]) }))
    const tab = getVisibleNodeOnScroll(tabNodes, burgerIngredientsList.current)
    setCurrentTab(tab.name)
  }
  const showActiveTab = (tab) => {
    scrollTo(document.getElementById(getTranslate[tab]), burgerIngredientsList.current)
  }

  useEffect(() => {
    const list = burgerIngredientsList.current
    list.addEventListener('scroll', setActiveTabOnScroll)
    return () => {
      list.removeEventListener('scroll', setActiveTabOnScroll)
    }
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
