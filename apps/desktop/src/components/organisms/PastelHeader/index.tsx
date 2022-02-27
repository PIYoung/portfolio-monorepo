import * as Styled from './styled';

import { BsArrowRepeat, BsChevronLeft, BsPlus, BsSearch } from 'react-icons/bs';
import React, { useCallback } from 'react';
import { addNewPaletts, addPalettsNewColor } from '../../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../reducers';
import { useNavigate } from 'react-router-dom';

export default React.memo(function PastelHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paletts, currentViewedPaletts, selectedHex, selectedMenu } = useSelector((state: RootState) => state.pastel);

  const goBack = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      if (selectedMenu.isDetail) {
        navigate(-1);
      }
    },
    [selectedMenu, navigate],
  );

  const resetLocalStorage = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    localStorage.clear();
    window.location.reload();
  }, []);

  const addPaletteOrColor = useCallback(() => {
    if (selectedMenu.isDetail && currentViewedPaletts) {
      dispatch(
        addPalettsNewColor({
          index: currentViewedPaletts - 1,
          color: { hex: selectedHex },
        }),
      );
    } else {
      dispatch(
        addNewPaletts({
          id: paletts.length + 1,
          uid: 1,
          title: 'Untitled Palette',
          colors: [{ hex: selectedHex }],
        }),
      );
    }
  }, [dispatch, paletts, currentViewedPaletts, selectedHex, selectedMenu]);

  return (
    <Styled.Container className='p-4 flex items-center justify-between'>
      <div className='flex items-center'>
        <div onClick={goBack} style={{ color: 'var(--color-pastel-text-secondary)' }} className='cursor-pointer mr-2'>
          <BsChevronLeft />
        </div>
        <div style={{ color: 'var(--color-pastel-text)' }}>{selectedMenu.title}</div>
      </div>
      <div style={{ color: 'var(--color-pastel-text)' }} className='flex items-center'>
        <div className='mr-2 cursor-pointer hover:bg-slate-500 hover:rounded-md' onClick={resetLocalStorage}>
          <BsArrowRepeat size={20} />
        </div>
        <div className='mr-2 cursor-pointer hover:bg-slate-500 hover:rounded-md' onClick={addPaletteOrColor}>
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
