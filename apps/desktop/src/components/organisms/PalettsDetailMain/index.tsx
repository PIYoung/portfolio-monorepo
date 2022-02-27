import * as Styled from '../PastelMain/styled';

import React, { useCallback } from 'react';

import DroppableItem from '../../templates/DroppableItem';
import PastelColors from '../../molecules/PastelColors';
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default function PalettsDetailMain() {
  const { paletts, currentViewedPaletts } = useSelector((state: RootState) => state.pastel);

  const drawMain = useCallback(() => {
    const _paletts = paletts.find(e => e.id === currentViewedPaletts);

    return <PastelColors palettsColors={_paletts.colors} />;
  }, [paletts, currentViewedPaletts]);

  return (
    <Styled.Container className='p-4'>
      <DroppableItem>{drawMain()}</DroppableItem>
    </Styled.Container>
  );
}
