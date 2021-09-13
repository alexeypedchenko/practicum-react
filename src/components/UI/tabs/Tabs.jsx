import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Tabs.module.css'
import PropTypes from 'prop-types'

const Tabs = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <div className={styles.controls}>
      {tabs.map((tab) =>
        <Tab key={tab} value={tab} active={currentTab === tab} onClick={setCurrentTab}>
          {tab}
        </Tab>
      )}
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
}

export default Tabs
