import * as Styled from '../Pastel/styled';

import PalettsDetailMain from '../../components/organisms/PalettsDetailMain';
import PastelHeader from '../../components/organisms/PastelHeader';
import PastelMainAside from '../../components/organisms/PastelMainAside';
import PastelNavigation from '../../components/organisms/PastelNavigation';
import React from 'react';

export default function PalettsDetail() {
  return (
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
  );
}
