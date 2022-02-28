import * as Styled from './styled';

import { BsFillLightbulbFill, BsFillLightbulbOffFill } from 'react-icons/bs';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../reducers';
import { setTheme } from '../../../reducers/user.reducer';

export default function ColorTheme() {
  const dispatch = useDispatch();
  const { configurations } = useSelector((state: RootState) => state.user);

  const changeColorTheme = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const theme = configurations.theme === 'light' ? 'dark' : 'light';
      dispatch(setTheme(theme));
    },
    [dispatch, configurations],
  );

  return (
    <Styled.Container onClick={changeColorTheme}>
      {configurations.theme === 'light' ? (
        <React.Fragment>
          <BsFillLightbulbFill size={24} />
          <p>다크모드 켜기</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <BsFillLightbulbOffFill size={24} />
          <p>다크모드 끄기</p>
        </React.Fragment>
      )}
    </Styled.Container>
  );
}
