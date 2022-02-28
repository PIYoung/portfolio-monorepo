import * as Styled from '../PastelMain/styled';

import React, { useCallback, useEffect } from 'react';
import { setCurrentViewedPalettes, setPalettsLastVisited, setSelectedMenu } from '../../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import DroppableItem from '../../templates/DroppableItem';
import PastelColors from '../../molecules/PastelColors';
import { RootState } from '../../../reducers';
import { useParams } from 'react-router-dom';

export default function PalettsDetailMain() {
  const dispatch = useDispatch();
  const { paletts, currentViewedPaletts, selectedMenu } = useSelector((state: RootState) => state.pastel);
  const { id } = useParams();

  const drawMain = useCallback(() => {
    if (!currentViewedPaletts) return;

    const _paletts = paletts.find(e => e.id === currentViewedPaletts);

    return <PastelColors palettsColors={_paletts.colors} />;
  }, [paletts, currentViewedPaletts]);

  useEffect(() => {
    if (currentViewedPaletts !== Number(id)) {
      dispatch(setCurrentViewedPalettes(Number(id)));

      dispatch(
        setPalettsLastVisited({
          date: new Date(),
          id: Number(id),
        }),
      );

      dispatch(
        setSelectedMenu({
          ...selectedMenu,
          title: paletts.find(e => e.id === Number(id)).title,
          isDetail: true,
        }),
      );
    }
  }, [id, selectedMenu, paletts, currentViewedPaletts, dispatch]);

  return (
    <Styled.Container className='p-4'>
      <DroppableItem>{drawMain()}</DroppableItem>
    </Styled.Container>
  );
}
