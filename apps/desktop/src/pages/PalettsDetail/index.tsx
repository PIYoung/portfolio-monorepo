import * as Styled from '../Pastel/styled';

import React, { useEffect } from 'react';
import { setCurrentViewedPalettes, setPalettsLastVisited, setSelectedMenu } from '../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import ContextMenuContainer from '../../components/templates/ContextMenuContainer';
import PalettsDetailMain from '../../components/organisms/PalettsDetailMain';
import PastelHeader from '../../components/organisms/PastelHeader';
import PastelMainAside from '../../components/organisms/PastelMainAside';
import PastelNavigation from '../../components/organisms/PastelNavigation';
import { RootState } from '../../reducers';
import { useParams } from 'react-router-dom';

export default function PalettsDetail() {
  const dispatch = useDispatch();
  const { paletts, currentViewedPaletts, selectedMenu } = useSelector((state: RootState) => state.pastel);
  const { id } = useParams();

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
    <ContextMenuContainer>
      <Styled.FlexContainer>
        <PastelNavigation />
        <Styled.Container>
          <PastelHeader />
          <Styled.FlexContainer style={{ height: 'calc(100vh - 60px)' }}>
            <PalettsDetailMain />
            <PastelMainAside />
          </Styled.FlexContainer>
        </Styled.Container>
      </Styled.FlexContainer>
    </ContextMenuContainer>
  );
}
