import React from 'react';
import { useDrag } from 'react-dnd';

interface Props {
  children: React.ReactNode;
}

export default function DraggableItem({ children }: Props) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'HEX',
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );

  return (
    <div ref={dragRef} style={{ opacity }}>
      {children}
    </div>
  );
}
