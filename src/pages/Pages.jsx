import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom'
import IngredientDetails from '../components/ingredient/ingredient-details/IngredientDetails'
import Modal from '../components/modal/modal/Modal'
import ProtectedRoute from '../components/protected-route/ProtectedRoute'
// Pages
import CreateBurger from './create-burger/CreateBurger'
import Login from './login/Login'
import Register from './register/Register'
import ForgotPassword from './forgot-password/ForgotPassword'
import ResetPassword from './reset-password/ResetPassword'
import Profile from './profile/Profile'
import Error from './error/Error'
import Ingredient from './ingredient/Ingredient'

const Pages = () => {
  const location = useLocation()
  const history = useHistory()
  const background = location.state && location.state.background

  const back = () => {
    history.goBack()
  }

  return (
    <>
      <Switch location={background || location}>
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/ingredients/:id">
          <Ingredient />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact={true}>
          <CreateBurger />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>

      {background && <Route path="/ingredients/:id" children={
        <Modal
          close={back}
          title="Детали ингредиента"
          classes="pt-10 pb-15"
        >
          <IngredientDetails />
        </Modal>
      } />}
    </>
  )
}

export default Pages
