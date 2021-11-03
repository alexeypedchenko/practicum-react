import { ConnectDragSource, useDrag } from 'react-dnd';

interface ICallBacks {
  onDragEnd?: () => void;
}

interface IDragged {
  isDragging: boolean;
  drag: ConnectDragSource;
}

export const useDragged = (item: any, type: string, { onDragEnd }: ICallBacks = {}): IDragged => {
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
