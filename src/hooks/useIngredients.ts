import { useSelector } from "react-redux"
import { useDispatch } from './storeHooks'
import { fetchIngredients, selectIngredients } from '../store/slices/ingredientsSlice'
import { useEffect } from "react"

export const useIngredients = () => {
  const { ingredients } = useSelector(selectIngredients)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients())
    }
  }, [])

  return ingredients
}
