import React, { useCallback } from 'react';
import { setColorRenameIndex, setSelectedHex, updateColor } from '../../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../reducers';

interface Props {
  title: string;
  hex: string;
  removable: boolean;
  index: number;
}

export default React.memo(function PastelColor({ title, hex, removable, index }: Props) {
  const dispatch = useDispatch();
  const { renameColorIndex } = useSelector((state: RootState) => state.pastel);

  const handleClick = useCallback(() => {
    dispatch(setSelectedHex(hex));
  }, [dispatch, hex]);

  const renameColor = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target;
      if (target instanceof HTMLInputElement) {
        if (e.key === 'Enter') {
          dispatch(
            updateColor({
              index: renameColorIndex,
              title: target.value,
            }),
          );
          dispatch(setColorRenameIndex(null));
        }
      }
    },
    [renameColorIndex, dispatch],
  );

  return (
    <div onClick={handleClick} className='mb-12 cursor-pointer ' style={{ width: '92px', height: `92px` }}>
      <div
        data-type={'colors'}
        data-removable={removable}
        data-index={index}
        className='w-full h-full rounded-md'
        style={{ backgroundColor: hex }}
      />
      <div>
        <div
          data-type={'colors'}
          data-removable={removable}
          data-index={index}
          className='text-sm'
          style={{ color: 'var(--color-pastel-text)' }}>
          {renameColorIndex === index ? (
            <input
              onKeyPress={renameColor}
              className='rounded-sm pl-1 text-xs'
              style={{
                backgroundColor: 'var(--color-pastel-background)',
                width: '100%',
              }}
              autoFocus={true}
              placeholder={title}
            />
          ) : (
            title
          )}
        </div>
        <div
          data-type={'colors'}
          data-removable={removable}
          data-index={index}
          className='text-xs'
          style={{ color: 'var(--color-pastel-text-secondary)' }}>
          {hex}
        </div>
      </div>
    </div>
  );
});
