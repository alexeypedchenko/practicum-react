import React from 'react'
import styles from './OrderDetails.module.css'
import doneImage from '../../images/done.jpg'

const OrderDetails = ({ details }) => {
  return (
    <div className={`${styles.order} pt-9`}>
      <span className={`${styles.number} text text_type_digits-large mb-8`}>
        {details.order.number}
      </span>
      <span className="text text_type_main-medium mb-15">
        {details.name}
      </span>
      <img className={`${styles.image} mb-15`} src={doneImage} alt="done" />
      <span className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  )
}

export default OrderDetails
