import React, { useEffect, useState } from 'react'
import AppHeader from '../header/AppHeader'
import ConstructorPage from '../pages/constructor/ConstructorPage'

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    try {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {setData(data.data)})
    } catch (err) {
      console.log('err:', err)
    }
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <ConstructorPage data={data} />
    </div>
  );
}

export default App;
