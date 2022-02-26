import { ColorResult, SketchPicker } from 'react-color';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BsFillGearFill } from 'react-icons/bs';
import { RootState } from '../../../reducers';
import { setSelectedPalette } from '../../../reducers/pastel.reducer';

export default function PastelMainAsideMain() {
  const dispatch = useDispatch();
  const { selectedPalette } = useSelector((state: RootState) => state.pastel);

  const setSelectedFFFFFF = useCallback(() => {
    dispatch(setSelectedPalette('#ffffff'));
  }, [dispatch]);

  const handleChangeColor = useCallback(
    (color: ColorResult) => {
      dispatch(setSelectedPalette(color.hex));
    },
    [dispatch],
  );

  return (
    <div>
      <div className='m-4'>
        <SketchPicker
          onChange={handleChangeColor}
          color={selectedPalette}
          styles={{
            default: {
              picker: {
                backgroundColor: 'var(--color-pastel-navigation)',
              },
            },
          }}
          disableAlpha={true}
        />
      </div>
      <div
        style={{ borderColor: 'var(--color-pastel-text-secondary)', backgroundColor: 'var(--color-pastel-header)' }}
        className='flex items-center justify-between border-y p-2'>
        <div className='flex items-center'>
          <div style={{ backgroundColor: selectedPalette }} className='rounded-sm w-4 h-4 mr-2' />
          <div className='text-sm' style={{ color: 'var(--color-pastel-text)' }}>
            {selectedPalette}
          </div>
        </div>
        <div
          onClick={setSelectedFFFFFF}
          className='cursor-pointer'
          style={{ color: 'var(--color-pastel-text-secondary)' }}>
          <BsFillGearFill />
        </div>
      </div>
    </div>
  );
}
