import React, { useEffect, useState } from 'react'
import AppHeader from '../header/AppHeader'
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import styles from './App.module.css'

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response.status)
      })
      .then((data) => {setData(data.data)})
      .catch((err) => {console.log('err:', err)})
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className={`${styles.main} container pb-10`}>
        <h1 style={{ width: '100%' }} className="mb-5 text text_type_main-large">
          Соберите бургер
        </h1>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
