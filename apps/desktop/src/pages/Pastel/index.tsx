import * as Styled from './styled';

import PastelHeader from '../../components/organisms/PastelHeader';
import PastelMain from '../../components/organisms/PastelMain';
import PastelNavigation from '../../components/organisms/PastelNavigation';
import React from 'react';

export default function Pastel() {
  return (
    <Styled.FlexContainer>
      <PastelNavigation />
      <Styled.FlexContainer>
        <PastelHeader />
        <PastelMain />
      </Styled.FlexContainer>
    </Styled.FlexContainer>
  );
}
