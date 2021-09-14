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
