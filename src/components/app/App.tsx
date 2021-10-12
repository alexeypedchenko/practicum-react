import {
  BrowserRouter as Router,
} from 'react-router-dom'
import AppHeader from '../header/AppHeader'
import styles from './App.module.css'
import Pages from '../../pages/Pages'

function App() {
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
