import * as Styled from './styled';

import PastelHeader from '../../components/organisms/PastelHeader';
import PastelMain from '../../components/organisms/PastelMain';
import PastelMainAside from '../../components/organisms/PastelMainAside';
import PastelNavigation from '../../components/organisms/PastelNavigation';
import React from 'react';

export default function Pastel() {
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
