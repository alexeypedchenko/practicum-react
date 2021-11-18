import { v4 as uuidv4 } from 'uuid';
import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
import { IStringObject, ITabNode } from '../types/types'

export const getId = () => {
  return uuidv4()
}

export const getDate = (date: string): string => {
  return formatRelative(new Date(date), new Date(), { locale: ru })
}

export const getGroupedObjectByKey = <T>(arr: T[], key: string) => {
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
  'created': 'Создан',
  'pending': 'Готовится',
  'done': 'Выполнен',
  '_created': 'Создан:',
  '_pending': 'В работе:',
  '_done': 'Готовы:',
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
