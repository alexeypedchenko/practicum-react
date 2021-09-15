import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Tabs.module.css'

const Tabs = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <div className={styles.controls}>
      {tabs.map((tab) => (
        <Tab key={tab} value={tab} active={currentTab === tab} onClick={setCurrentTab}>
          {tab}
        </Tab>
      ))}
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setCurrentTab: PropTypes.func.isRequired,
  currentTab: PropTypes.string,
}

export default Tabs
