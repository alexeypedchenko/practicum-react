import { useDrag } from 'react-dnd';

export const useDragged = (item, type, { onDragEnd } = {}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult && (typeof onDragEnd === 'function')) {
        onDragEnd()
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return {
    isDragging,
    drag
  }
}
