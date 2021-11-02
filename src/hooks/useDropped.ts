import { ConnectDropTarget, useDrop } from 'react-dnd'

interface IDropped {
  drop: ConnectDropTarget;
  canDrop: boolean;
  isOver: boolean;
}

export const useDropped = (accept: string[] | string): IDropped => {
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
