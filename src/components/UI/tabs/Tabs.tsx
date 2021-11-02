import { FC } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Tabs.module.css'
import { ITabsProps } from '../../../types/types'

const Tabs: FC<ITabsProps> = ({ tabs, currentTab, setCurrentTab }) => {
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

export default Tabs
