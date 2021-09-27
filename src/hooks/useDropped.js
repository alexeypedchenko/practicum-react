import { useDrop } from 'react-dnd'

export const useDropped = (accept) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: Array.isArray(accept) ? [...accept] : accept,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return {
    drop,
    canDrop,
    isOver,
  }
}
