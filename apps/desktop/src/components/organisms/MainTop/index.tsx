import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Styled from './styled';
import { PATHS } from '../../../constants';

export default function MainTop() {
  const navigate = useNavigate();

  const moveTo = useCallback(
    (to: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      return navigate(to);
    },
    [navigate],
  );

  return (
    <Styled.Outline>
      <Styled.Button onClick={moveTo.bind(null, PATHS.PASTEL)}>둘러보기</Styled.Button>
      <Styled.Greeting>
        <p>만나서 반갑습니다.</p>
        <p>
          개발 잘하는 <b>박인영</b>입니다.
        </p>
      </Styled.Greeting>
      <Styled.Info>
        <p>
          github:{' '}
          <a href='https://github.com/PIYoung' target='_blank' rel='noreferrer'>
            https://github.com/PIYoung
          </a>
        </p>
        <p>hp: 010-2717-2868</p>
        <p>e-mail: dlsdudg15@naver.com</p>
      </Styled.Info>
    </Styled.Outline>
  );
}
