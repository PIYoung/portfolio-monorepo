import { addNewColor, addNewPaletts, addPalettsNewColor } from '../../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { RootState } from '../../../reducers';
import { useDrop } from 'react-dnd';

interface Props {
  children: React.ReactNode;
}

export default function DroppableItem({ children }: Props) {
  const dispatch = useDispatch();
  const { paletts, currentViewedPaletts, selectedMenu, selectedHex } = useSelector((state: RootState) => state.pastel);

  const [, drop] = useDrop(
    {
      accept: 'HEX',
      drop: () => {
        if (selectedMenu.isDetail && currentViewedPaletts) {
          return dispatch(
            addPalettsNewColor({
              color: { hex: selectedHex, removable: true },
              index: currentViewedPaletts - 1,
            }),
          );
        }

        switch (selectedMenu.uid) {
          case 3:
            return dispatch(
              addNewColor({
                title: 'Untitled Color',
                hex: selectedHex,
                removable: true,
              }),
            );

          default:
            return dispatch(
              addNewPaletts({
                id: paletts.length + 1,
                uid: selectedMenu.uid === 2 ? 1 : selectedMenu.uid,
                title: 'Untitled Palette',
                colors: [{ hex: selectedHex, removable: true }],
                removable: true,
              }),
            );
        }
      },
    },
    [paletts, selectedMenu, selectedHex, dispatch],
  );

  return (
    <div style={{ height: 'inherit' }} ref={drop}>
      {children}
    </div>
  );
}
