import * as Styled from './styled';

import React, { useCallback } from 'react';

import DroppableItem from '../../templates/DroppableItem';
import Paletts from '../../molecules/Paletts';
import PastelColors from '../../molecules/PastelColors';
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default function PastelMain() {
  const { paletts, selectedMenu } = useSelector((state: RootState) => state.pastel);

  const drawMain = useCallback(() => {
    switch (selectedMenu.uid) {
      case -1:
        return (
          <Paletts
            paletts={paletts.filter(item => item.title.toLowerCase().includes(selectedMenu.title.toLowerCase()))}
          />
        );

      case 1:
        return <Paletts paletts={paletts} />;

      case 2:
        return (
          <Paletts
            paletts={paletts.filter(e => e.lastVisited).sort((a, b) => (a.lastVisited < b.lastVisited ? 1 : -1))}
          />
        );

      case 3:
        return <PastelColors />;

      default:
        return <Paletts paletts={paletts.filter(e => e.uid === selectedMenu.uid)} />;
    }
  }, [selectedMenu, paletts]);

  return (
    <Styled.Container className='p-4'>
      <DroppableItem>{drawMain()}</DroppableItem>
    </Styled.Container>
  );
}
