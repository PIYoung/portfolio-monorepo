import React, { useCallback } from 'react';

import { setSelectedHex } from '../../../reducers/pastel.reducer';
import { useDispatch } from 'react-redux';

interface Props {
  title: string;
  hex: string;
}

export default React.memo(function PastelColor({ title, hex }: Props) {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setSelectedHex(hex));
  }, [dispatch, hex]);

  return (
    <div onClick={handleClick} className='mb-12 cursor-pointer ' style={{ width: '92px', height: `92px` }}>
      <div className='w-full h-full rounded-md' style={{ backgroundColor: hex }} />
      <div>
        <div className='text-sm' style={{ color: 'var(--color-pastel-text)' }}>
          {title}
        </div>
        <div className='text-xs' style={{ color: 'var(--color-pastel-text-secondary)' }}>
          {hex}
        </div>
      </div>
    </div>
  );
});
