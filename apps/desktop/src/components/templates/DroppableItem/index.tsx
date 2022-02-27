import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { RootState } from '../../../reducers';
import { addNewColor } from '../../../reducers/pastel.reducer';
import { useDrop } from 'react-dnd';

interface Props {
  children: React.ReactNode;
}

export default function DroppableItem({ children }: Props) {
  const dispatch = useDispatch();
  const { selectedMenu, selectedHex } = useSelector((state: RootState) => state.pastel);

  const [collectedProps, drop] = useDrop(
    {
      accept: 'HEX',
      drop: () => {
        switch (selectedMenu.uid) {
          case 1:
            break;

          case 2:
            break;

          case 3:
            dispatch(
              addNewColor({
                title: 'Untitled Color',
                hex: selectedHex,
              }),
            );
            break;

          default:
            break;
        }

        return console.log('This should not happen');
      },
    },
    [selectedMenu, selectedHex, dispatch],
  );

  console.log(collectedProps);

  return <div ref={drop}>{children}</div>;
}
