import React from 'react';
import { useDrop } from 'react-dnd';

interface Props {
  children: React.ReactNode;
}

export default function DroppableItem({ children }: Props) {
  const [collectedProps, drop] = useDrop(
    {
      accept: 'HEX',
      drop: () => {
        console.log(children);
        return { children };
      },
    },
    [],
  );

  console.log(collectedProps);

  return <div ref={drop}>{children}</div>;
}
