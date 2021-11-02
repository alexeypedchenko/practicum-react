import { v4 as uuidv4 } from 'uuid';
import { IStringObject, ITabNode } from '../types/types'

export const getId = () => {
  return uuidv4()
}

export const getGroupedObjectByKey = (arr: [], key: string) => {
  return arr.reduce((acc: any, val: any) => {
    (acc[val[key]] || (acc[val[key]] = [])).push(val)
    return acc
  }, {})
}

export const getTranslate: IStringObject = {
  'Булки': 'bun',
  'Начинки': 'main',
  'Соусы': 'sauce',
  'bun': 'Булки',
  'main': 'Начинки',
  'sauce': 'Соусы',
}

export const scrollTo = (element: HTMLElement, container: HTMLElement) => {
  const offset = element.offsetTop
  container.scrollTo({
    top: offset,
    behavior: "smooth"
  })
}

export const getVisibleNodeOnScroll = (
  nodeList: ITabNode[],
  container: HTMLElement | null,
  indent: number = 100
) => {
  if (!container) return
  const containerTopOffset = container.getBoundingClientRect().top + indent
  for (let i = nodeList.length - 1; i >= 0; i--) {
    const node = nodeList[i]
    if (node.$el) {
      const nodeTopOffset = node.$el.getBoundingClientRect().top
      if (nodeTopOffset < containerTopOffset) {
        return node
      }
    }
  }
}
