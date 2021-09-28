import React, { useState, useEffect, useRef, useMemo } from 'react'
import Tabs from '../UI/tabs/Tabs'
import IngredientList from '../ingredient/ingredient-list/IngredientList'
import Modal from '../modal/modal/Modal'
import IngredientDetails from '../ingredient/ingredient-details/IngredientDetails'
import { useDisclosure } from '../../hooks/useDisclosure'
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
import { removeDetailIngredient, selectDetailIngredient } from '../../store/slices/detailIngredientSlice'

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('')
  const [tabs, setTabs] = useState([])
  const burgerIngredientsList = useRef()

  const dispatch = useDispatch()
  const { ingredients } = useSelector(selectIngredients)
  const { bun, ingredients: constructorIngredients } = useSelector(selectBurgerConstructor)
  const { detailIngredient } = useSelector(selectDetailIngredient)

  const { isOpen, open, close } = useDisclosure(false, {
    onClose: () => dispatch(removeDetailIngredient())
  })

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  useEffect(() => {
    if (detailIngredient) {
      open()
    }
  }, [detailIngredient])

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
      list[bun._id] = 2
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
      {isOpen && (
        <Modal
          close={close}
          title="Детали ингредиента"
          classes="pt-10 pb-15"
        >
          <IngredientDetails />
        </Modal>
      )}
    </div>
  )
}

export default BurgerIngredients
