import React, { useState, useEffect, useRef } from 'react'
import Tabs from '../UI/tabs/Tabs'
import IngredientsList from '../ingredients/ingredients-list/IngredientsList'
import { getIngredients, translate } from '../../utils/data'
import styles from './BurgerConstructor.module.css'

const BurgerConstructor = () => {
  const [currentTab, setCurrentTab] = useState('Булки')
  const tabs = ['Булки', 'Соусы', 'Начинки']
  const ingridients = getIngredients()

  const burgerConstructorList = useRef()

  useEffect(() => {
    if (!currentTab) return
    const offset = document.getElementById(translate[currentTab]).offsetTop
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
        {tabs.map((tab) =>
          <IngredientsList
            id={translate[tab]}
            key={tab}
            title={tab}
            list={ingridients[translate[tab]]}
          />
        )}
      </div>
    </div>
  )
}

export default BurgerConstructor
