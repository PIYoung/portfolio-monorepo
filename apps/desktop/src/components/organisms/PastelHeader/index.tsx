import * as Styled from './styled';

import { BsChevronLeft, BsPlus, BsSearch } from 'react-icons/bs';
import React, { useCallback } from 'react';

import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default React.memo(function PastelHeader() {
  const { selectedMenu } = useSelector((state: RootState) => state.pastel);

  const addPalette = useCallback(() => {
    console.log('addPalette');
  }, []);

  return (
    <Styled.Container className='p-4 flex items-center justify-between'>
      <div className='flex items-center'>
        <div style={{ color: 'var(--color-pastel-text-secondary)' }} className='mr-2'>
          <BsChevronLeft />
        </div>
        <div style={{ color: 'var(--color-pastel-text)' }}>{selectedMenu.title}</div>
      </div>
      <div style={{ color: 'var(--color-pastel-text)' }} className='flex items-center'>
        <div className='mr-2 cursor-pointer' onClick={addPalette}>
          <BsPlus size={20} />
        </div>
        <div className='flex items-center p-1 w-48 border rounded-md'>
          <div className='mr-1 ml-1'>
            <BsSearch size={12} />
          </div>
          <div>
            <input className='bg-transparent focus:outline-none w-full placeholder:text-sm' placeholder='Search' />
          </div>
        </div>
      </div>
    </Styled.Container>
  );
});
