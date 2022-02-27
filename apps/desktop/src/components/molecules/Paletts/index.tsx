import * as I from '../../../interfaces';

import React, { useCallback } from 'react';

import PalettsItem from '../../atoms/PalettsItem';

interface Props {
  paletts: I.Paletts[];
}

export default function Paletts({ paletts }: Props) {
  const drawPalettsItem = useCallback((item: I.Paletts, index: number) => {
    return <PalettsItem key={index} index={index} item={item} />;
  }, []);

  return (
    <div className='flex flex-wrap justify-between'>
      {paletts.map(drawPalettsItem)}
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
      <div style={{ width: '200px', visibility: 'hidden' }} />
    </div>
  );
}
