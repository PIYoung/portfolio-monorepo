import { ColorResult, SketchPicker } from 'react-color';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BsFillGearFill } from 'react-icons/bs';
import DraggableItem from '../../templates/DraggableItem';
import { HexEvent } from '../../../interfaces';
import { RootState } from '../../../reducers';
import { setHexEvent } from '../../../reducers/user.reducer';
import { setSelectedHex } from '../../../reducers/pastel.reducer';

export default function PastelMainAsideMain() {
  const dispatch = useDispatch();
  const { selectedHex } = useSelector((state: RootState) => state.pastel);
  const { hexEvent } = useSelector((state: RootState) => state.user.configurations);

  const setSelectedFFFFFF = useCallback(() => {
    dispatch(setSelectedHex('#ffffff'));
  }, [dispatch]);

  const handleChangeColor = useCallback(
    (color: ColorResult) => {
      dispatch(setSelectedHex(color.hex));
    },
    [dispatch],
  );

  const handleRadio = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      if ('value' in target) {
        dispatch(setHexEvent(target.value as HexEvent));
      }
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
            <div
              style={{ backgroundColor: selectedHex }}
              className={`piystel-15 animate-${hexEvent} cursor-pointer rounded-sm w-6 h-6`}
            />
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
      <div className='m-3 text-sm' style={{ color: 'var(--color-text)' }}>
        <div className='mb-2' style={{ width: '220px' }}>
          <input
            id='hex-event-none'
            name='hex-event'
            type='radio'
            checked={hexEvent === ''}
            value=''
            onChange={handleRadio}
          />
          <label htmlFor='hex-event-none' className='ml-1 inline-block' style={{ width: '200px' }}>
            none
          </label>
        </div>
        <div className='mb-2' style={{ width: '220px' }}>
          <input
            id='hex-event-ping'
            name='hex-event'
            type='radio'
            checked={hexEvent === 'ping'}
            value='ping'
            onChange={handleRadio}
          />
          <label htmlFor='hex-event-ping' className='ml-1 inline-block' style={{ width: '200px' }}>
            ping
          </label>
        </div>
        <div className='mb-2' style={{ width: '220px' }}>
          <input
            id='hex-event-bounce'
            name='hex-event'
            type='radio'
            checked={hexEvent === 'bounce'}
            value='bounce'
            onChange={handleRadio}
          />
          <label htmlFor='hex-event-bounce' className='ml-1 inline-block' style={{ width: '200px' }}>
            bounce
          </label>
        </div>
        <div className='mb-2' style={{ width: '220px' }}>
          <input
            id='hex-event-spin'
            name='hex-event'
            type='radio'
            checked={hexEvent === 'spin'}
            value='spin'
            onChange={handleRadio}
          />
          <label htmlFor='hex-event-spin' className='ml-1 inline-block' style={{ width: '200px' }}>
            spin
          </label>
        </div>
        <div className='mb-2' style={{ width: '220px' }}>
          <input
            id='hex-event-pulse'
            name='hex-event'
            type='radio'
            checked={hexEvent === 'pulse'}
            value='pulse'
            onChange={handleRadio}
          />
          <label htmlFor='hex-event-pulse' className='ml-1 inline-block' style={{ width: '200px' }}>
            pulse
          </label>
        </div>
      </div>
    </div>
  );
}
