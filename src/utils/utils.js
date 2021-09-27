import { v4 as uuidv4 } from 'uuid';

export const API_URL = 'https://norma.nomoreparties.space/api/ingredients'
export const ORDER_URL = 'https://norma.nomoreparties.space/api/orders'

export const getId = () => {
  return uuidv4()
}

export const getGroupedObjectByKey = (obj, key) => {
  return obj.reduce((acc, val) => {
    (acc[val[key]] || (acc[val[key]] = [])).push(val)
    return acc
  }, {})
}

export const getTranslate = {
  'Булки': 'bun',
  'Начинки': 'main',
  'Соусы': 'sauce',
  'bun': 'Булки',
  'main': 'Начинки',
  'sauce': 'Соусы',
}

export const scrollTo = (element, container) => {
  const offset = element.offsetTop
  container.scrollTo({
    top: offset,
    behavior: "smooth"
  })
}

export const getVisibleNodeOnScroll = (nodeList, container, indent = 100) => {
  const containerTopOffset = container.getBoundingClientRect().top + indent
  for (let i = nodeList.length - 1; i >= 0; i--) {
    const node = nodeList[i]
    const nodeTopOffset = node.$el.getBoundingClientRect().top
    if (nodeTopOffset < containerTopOffset) {
      return node
    }
  }
}
