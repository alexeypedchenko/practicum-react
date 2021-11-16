import { FC } from 'react'
import styles from './Scoreboard.module.css'
import { IOrder } from '../../types/types'
import { getTranslate } from '../../utils/utils'

interface IScoreboardProps {
  total: number | undefined;
  totalToday: number | undefined;
  orders: {[key: string]: IOrder[]};
}

const Scoreboard: FC<IScoreboardProps> = ({total, totalToday, orders}) => {
  return (
    <div className={styles.scoreboard}>
      <div className={`${styles.progress} mb-15`}>
        {orders && Object.keys(orders).map((status) => (
          <div key={status} className={styles.status}>
            <p className="text text_type_main-medium mb-6">
              {getTranslate['_'+status]}
            </p>
            <div className={`
              ${styles.list}
              custom-scroll
              ${status === 'done' ? 'color-success' : ''}
            `}>
              {orders[status].map((item) => (
                <p className="text text_type_digits-default mb-2" key={item.number}>
                  {item.number}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">
          Выполнено за все время:
        </p>
        <p className={`${styles.number} text text_type_digits-large`}>
          {total}
        </p>
      </div>
      <div>
        <p className="text text_type_main-medium">
          Выполнено за сегодня:
        </p>
        <p className={`${styles.number} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </div>
  )
}

export default Scoreboard
