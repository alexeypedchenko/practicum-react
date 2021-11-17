import { FC } from 'react'
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom'
import IngredientDetails from '../components/ingredient/ingredient-details/IngredientDetails'
import Modal from '../components/modal/modal/Modal'
import ProtectedRoute from '../components/protected-route/ProtectedRoute'
import { ILocation } from '../types/types'
// Pages
import CreateBurger from './create-burger/CreateBurger'
import Login from './login/Login'
import Register from './register/Register'
import ForgotPassword from './forgot-password/ForgotPassword'
import ResetPassword from './reset-password/ResetPassword'
import Profile from './profile/Profile'
import Error from './error/Error'
import Ingredient from './ingredient/Ingredient'
import Feed from './feed/Feed'
import FeedInfo from './feed/feed-info/FeedInfo'
import Orders from './orders/Orders'

const Pages: FC = () => {
  const location = useLocation<ILocation>()
  const history = useHistory()
  const background = location.state && location.state.background

  const back = () => {
    history.goBack()
  }

  return (
    <>
      <Switch location={background || location}>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <Orders />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <FeedInfo />
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
        <Route path="/feed" exact={true}>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FeedInfo />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>

      {background && (
        <>
          <Route path="/ingredients/:id" children={
            <Modal
              close={back}
              title="Детали ингредиента"
              classes="pt-10 pb-15"
            >
              <IngredientDetails />
            </Modal>
          }/>
          <Route path="/feed/:id" children={
            <Modal
              close={back}
              classes="pt-10 pb-15"
            >
              <FeedInfo />
            </Modal>
          }/>
          <ProtectedRoute path="/profile/orders/:id">
            <Modal
              close={back}
              classes="pt-10 pb-15"
            >
              <FeedInfo />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </>
  )
}

export default Pages
