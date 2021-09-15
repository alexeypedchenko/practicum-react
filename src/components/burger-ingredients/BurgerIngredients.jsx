import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Tabs from '../UI/tabs/Tabs'
import IngredientList from '../ingredient/ingredient-list/IngredientList'
import { getGroupedObjectByKey, getTranslate } from '../../utils/utils'
import styles from './BurgerIngredients.module.css'
import {BURGER_INGREDIENT} from '../../utils/shapes'

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState('')
  const [ingridients, setIngridients] = useState({})
  const [tabs, setTabs] = useState([])
  const BurgerIngredientsList = useRef()

  useEffect(() => {
    const groupData = getGroupedObjectByKey(data, 'type')
    setIngridients(groupData)
    setTabs(Object.keys(groupData).map((key) => getTranslate[key]))
  }, [data])

  useEffect(() => {
    setCurrentTab(tabs[0])
  }, [tabs])

  useEffect(() => {
    if (!currentTab) return
    const offset = document.getElementById(getTranslate[currentTab]).offsetTop
    BurgerIngredientsList.current.scrollTo({
      top: offset,
      behavior: "smooth"
    })
  }, [currentTab])

  return (
    <div className={styles.container}>
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div
        ref={BurgerIngredientsList}
        className={`${styles.list} custom-scroll mt-10`}
      >
        {tabs.map((tab) => (
          <IngredientList
            id={getTranslate[tab]}
            key={tab}
            title={tab}
            list={ingridients[getTranslate[tab]]}
          />
        ))}
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(BURGER_INGREDIENT.isRequired).isRequired
}

export default BurgerIngredients
