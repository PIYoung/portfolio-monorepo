import * as Styled from './styled';

import React, { useLayoutEffect } from 'react';

import ColorTheme from '../../components/molecules/ColorTheme';
import MainTop from '../../components/organisms/MainTop';
import { PATHS } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const isEnvThreeJS = process.env.REACT_APP_THREE_JS === 'true';

    if (isEnvThreeJS) {
      return navigate({
        pathname: PATHS.THREE_JS,
        search: '?chapter=chapter1_1',
      });
    }
  }, [navigate]);

  return (
    <Styled.Wrapper className='123'>
      <Styled.TopContainer>
        <ColorTheme />
        <MainTop />
      </Styled.TopContainer>
      <Styled.BottomContainer>123</Styled.BottomContainer>
    </Styled.Wrapper>
  );
};

export default Main;
