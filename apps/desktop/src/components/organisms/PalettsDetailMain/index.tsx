import * as Styled from '../PastelMain/styled';

import React, { useCallback } from 'react';

import DroppableItem from '../../templates/DroppableItem';
import Paletts from '../../molecules/Paletts';
import PastelColors from '../../molecules/PastelColors';
import { RootState } from '../../../reducers';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PalettsDetailMain() {
  const { id } = useParams();
  const { paletts, selectedMenu } = useSelector((state: RootState) => state.pastel);

  const drawMain = useCallback(() => {
    return <div></div>;
  }, [selectedMenu, paletts]);

  return (
    <Styled.Container className='p-4'>
      <DroppableItem>{drawMain()}</DroppableItem>
    </Styled.Container>
  );
}
