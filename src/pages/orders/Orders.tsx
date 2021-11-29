import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import OrderTape from '../../components/order-tape/OrderTape'
import { useDispatch, useSelector } from '../../hooks/storeHooks'
import { selectLiveOrders, wsDisconnect, wsConnect } from '../../store/slices/live-orders/liveOrdersSlice'
import { GET_USER_ORDERS } from '../../utils/api'
import Sidebar from '../../components/sidebar/Sidebar'

const Orders: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { data } = useSelector(selectLiveOrders)
  const accessToken: string | null = localStorage.getItem('accessToken')

  useEffect(() => {
    history.replace({ state: {} })
    dispatch(wsConnect(GET_USER_ORDERS + accessToken?.slice(7)))
    return () => {
      dispatch(wsDisconnect())
    }
  }, [])

  return (
    <div style={{display: 'flex'}} className="container">
      <Sidebar />
      <OrderTape orders={data?.orders || null }/>
    </div>
  )
}

export default Orders
