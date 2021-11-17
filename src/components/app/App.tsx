import {
  BrowserRouter as Router,
} from 'react-router-dom'
import AppHeader from '../header/AppHeader'
import styles from './App.module.css'
import Pages from '../../pages/Pages'
import { useEffect } from 'react'
import { fetchIngredients } from '../../store/slices/ingredientsSlice'
import { useDispatch } from '../../hooks/storeHooks'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className={`${styles.main} container pb-10`}>
          <Pages />
        </main>
      </div>
    </Router>
  );
}

export default App;
