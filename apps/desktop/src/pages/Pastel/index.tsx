import * as Styled from './styled';

import React, { useEffect } from 'react';
import { setCurrentViewedPalettes, setSelectedMenu } from '../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import ContextMenuContainer from '../../components/templates/ContextMenuContainer';
import PastelHeader from '../../components/organisms/PastelHeader';
import PastelMain from '../../components/organisms/PastelMain';
import PastelMainAside from '../../components/organisms/PastelMainAside';
import PastelNavigation from '../../components/organisms/PastelNavigation';
import { RootState } from '../../reducers';

export default function Pastel() {
  const dispatch = useDispatch();
  const { menus, selectedMenu } = useSelector((state: RootState) => state.pastel);

  useEffect(() => {
    if (selectedMenu.isDetail) {
      let hasDone = false;
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];

        for (let j = 0; j < menu.children.length; j++) {
          const child = menu.children[j];

          if (child.uid === selectedMenu.uid) {
            dispatch(setSelectedMenu(child));
            dispatch(setCurrentViewedPalettes(null));
            hasDone = true;

            break;
          }
        }

        if (hasDone) break;
      }
    }
  }, [dispatch, menus, selectedMenu]);

  return (
    <ContextMenuContainer>
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
    </ContextMenuContainer>
  );
}
