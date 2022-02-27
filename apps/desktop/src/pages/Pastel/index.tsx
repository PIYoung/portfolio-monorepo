import * as Styled from './styled';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationMenu } from '../../interfaces';
import PastelHeader from '../../components/organisms/PastelHeader';
import PastelMain from '../../components/organisms/PastelMain';
import PastelMainAside from '../../components/organisms/PastelMainAside';
import PastelNavigation from '../../components/organisms/PastelNavigation';
import { RootState } from '../../reducers';
import { setSelectedMenu } from '../../reducers/pastel.reducer';

export default function Pastel() {
  const dispatch = useDispatch();
  const { menus, selectedMenu } = useSelector((state: RootState) => state.pastel);

  useEffect(() => {
    if (selectedMenu.isDetail) {
      menus.forEach(menu => {
        menu.children.forEach(child => {
          child.uid === selectedMenu.uid && dispatch(setSelectedMenu(child));
        });
      });
    }
  }, [dispatch, menus, selectedMenu]);

  return (
    <Styled.FlexContainer>
      <PastelNavigation />
      <Styled.Container>
        <PastelHeader />
        <Styled.FlexContainer style={{ height: 'calc(100vh - 60px)' }}>
          <PastelMain />
          <PastelMainAside />
        </Styled.FlexContainer>
      </Styled.Container>
    </Styled.FlexContainer>
  );
}
