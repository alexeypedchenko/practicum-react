import reducer, {
  addIngridient,
  removeIngredient,
  addBun,
  removeAllIngredients,
  changeItemsPosition
} from './burgerConstructorSlice'

const bun = {
  _id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
}

const ingredients = [
  {
    _id: "60d3b41abdacab0026a733c8",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
    id: 'ingredient_1'
  },
  {
    _id: "60d3b41abdacab0026a733c9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
    id: 'ingredient_2'
  }
]

describe('burger constructor reducer', () => {
  const initialState = { ingredients: [], bun: null }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should return state with bun', () => {
    expect(
      reducer(initialState, addBun(bun))
    ).toEqual({
      ...initialState, bun: bun
    })
  })

  it('should return state with ingredient', () => {
    expect(
      reducer(initialState, addIngridient(ingredients[0]))
    ).toEqual({
      ...initialState, ingredients: [ingredients[0]],
    })
  })

  it('should return state without ingredient', () => {
    expect(
      reducer({
        ingredients: [ingredients[0]],
        bun: null,
      }, removeIngredient(ingredients[0].id))
    ).toEqual(initialState)
  })

  it('should return state without ingredients', () => {
    expect(
      reducer({
        ingredients: [...ingredients],
        bun: bun,
      }, removeAllIngredients())
    ).toEqual(initialState)
  })

  it('should return state with changed ingredients positions', () => {
    expect(
      reducer({
        ingredients: [
          ingredients[0],
          ingredients[1],
        ],
        bun: null,
      }, changeItemsPosition({ dragIndex: 0, hoverIndex: 1 }))
    ).toEqual({
      ...initialState,
      ingredients: [
        ingredients[1],
        ingredients[0],
      ],
    })
  })
})
