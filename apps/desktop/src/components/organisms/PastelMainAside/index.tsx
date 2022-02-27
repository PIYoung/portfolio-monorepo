import * as Styled from './styled';

import PastelMainAsideMain from '../../molecules/PastelMainAsideMain';
import React from 'react';

export default React.memo(function PastelMainAside() {
  return (
    <Styled.Container>
      <PastelMainAsideMain />
    </Styled.Container>
  );
});
