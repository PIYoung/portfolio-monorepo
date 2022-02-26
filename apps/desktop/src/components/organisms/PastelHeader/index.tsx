import * as Styled from './styled';

import { BsChevronLeft } from 'react-icons/bs';
import React from 'react';
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default function PastelHeader() {
  const { headerTitle } = useSelector((state: RootState) => state.pastel);

  return (
    <Styled.Container className='p-4 flex items-center'>
      <div style={{ color: 'var(--color-pastel-text-secondary)' }} className='mr-2'>
        <BsChevronLeft />
      </div>
      <div style={{ color: 'var(--color-pastel-text)' }}>{headerTitle}</div>
    </Styled.Container>
  );
}
