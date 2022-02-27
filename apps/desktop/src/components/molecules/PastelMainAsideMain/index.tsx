import { ColorResult, SketchPicker } from 'react-color';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BsFillGearFill } from 'react-icons/bs';
import DraggableItem from '../../templates/DraggableItem';
import { RootState } from '../../../reducers';
import { setSelectedHex } from '../../../reducers/pastel.reducer';

export default function PastelMainAsideMain() {
  const dispatch = useDispatch();
  const { selectedHex } = useSelector((state: RootState) => state.pastel);

  const setSelectedFFFFFF = useCallback(() => {
    dispatch(setSelectedHex('#ffffff'));
  }, [dispatch]);

  const handleChangeColor = useCallback(
    (color: ColorResult) => {
      dispatch(setSelectedHex(color.hex));
    },
    [dispatch],
  );

  return (
    <div>
      <div className='piystel-13 m-4'>
        <SketchPicker
          onChange={handleChangeColor}
          color={selectedHex}
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
        className='piystel-14 flex items-center justify-between border-y p-2'>
        <div className='flex items-center'>
          <DraggableItem>
            <div style={{ backgroundColor: selectedHex }} className='piystel-15 rounded-sm w-4 h-4' />
          </DraggableItem>
          <div className='text-sm ml-2' style={{ color: 'var(--color-pastel-text)' }}>
            {selectedHex}
          </div>
        </div>
        <div
          onClick={setSelectedFFFFFF}
          className='piystel-16 cursor-pointer'
          style={{ color: 'var(--color-pastel-text-secondary)' }}>
          <BsFillGearFill />
        </div>
      </div>
    </div>
  );
}
