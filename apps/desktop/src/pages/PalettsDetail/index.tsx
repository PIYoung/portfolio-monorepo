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
    if (currentViewedPaletts === Number(id)) return;

    for (let i = 0; i < paletts.length; i++) {
      if (paletts[i].id === Number(id)) {
        dispatch(setCurrentViewedPalettes(paletts[i].id));

        dispatch(
          setPalettsLastVisited({
            date: new Date(),
            index: i,
          }),
        );

        dispatch(
          setSelectedMenu({
            ...selectedMenu,
            title: paletts[i].title,
            isDetail: true,
          }),
        );

        break;
      }
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
