import { FC, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Feed.module.css'
import OrderTape from '../../components/order-tape/OrderTape'
import Scoreboard from '../../components/scoreboard/Scoreboard'
import { useDispatch } from '../../hooks/storeHooks'
import { selectLiveOrders, wsConnect, wsDisconnect } from '../../store/slices/liveOrdersSlice'
import { GET_ALL_ORDERS } from '../../utils/api'
import { useSelector } from 'react-redux'
import { IOrder } from '../../types/types'
import { getGroupedObjectByKey } from '../../utils/utils'

const Feed: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { data } = useSelector(selectLiveOrders)

  useEffect(() => {
    history.replace({ state: {} })
    dispatch(wsConnect(GET_ALL_ORDERS))
    return () => {
      dispatch(wsDisconnect())
    }
  }, [])

  const orders = useMemo(() => {
    if (data) {
      return getGroupedObjectByKey<IOrder>(data.orders, 'status')
    }
  }, [data?.orders])

  return (
    <div className="container">
      <p className="text text_type_main-large mb-4">
        Лента заказов
      </p>
      <div className={styles.row}>
        <div className={styles.col}>
          <OrderTape orders={data?.orders || null }/>
        </div>
        <div className={styles.col}>
          <Scoreboard
            total={data?.total}
            totalToday={data?.totalToday}
            orders={orders}
          />
        </div>
      </div>
    </div>
  )
}

export default Feed
