import React, { useCallback } from 'react';

import { Color } from '../../../interfaces/pastel.interface';
import PastelColor from '../../atoms/PastelColor';
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default function Colors() {
  const { paletts, colors } = useSelector((state: RootState) => state.pastel);

  const drawColors = useCallback((color: Color, index: number) => {
    return <PastelColor key={index} title={color.title} hex={color.hex} />;
  }, []);

  return <div className='flex flex-wrap justify-between text-center'>{colors.map(drawColors)}</div>;
}
