import * as Styled from './styled';

import { BsFillLightbulbFill, BsFillLightbulbOffFill } from 'react-icons/bs';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../reducers';
import { setUserConfigurations } from '../../../reducers/user.reducer';

export default function ColorMode() {
  const dispatch = useDispatch();
  const { configurations } = useSelector((state: RootState) => state.user);

  const changeColorMode = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(
        setUserConfigurations({
          theme: configurations.theme === 'light' ? 'dark' : 'light',
        }),
      );
    },
    [dispatch, configurations],
  );

  return (
    <Styled.Container onClick={changeColorMode}>
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
