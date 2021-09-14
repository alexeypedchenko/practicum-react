import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Tabs from '../UI/tabs/Tabs'
import IngredientList from '../ingredient/ingredient-list/IngredientList'
import { getGroupedObjectByKey, getTranslate } from '../../utils/utils'
import styles from './BurgerConstructor.module.css'

const BurgerConstructor = ({ data }) => {
  const [currentTab, setCurrentTab] = useState('')
  const [ingridients, setIngridients] = useState({})
  const [tabs, setTabs] = useState([])
  const burgerConstructorList = useRef()

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
    burgerConstructorList.current.scrollTo({
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
        ref={burgerConstructorList}
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

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
}

export default BurgerConstructor
