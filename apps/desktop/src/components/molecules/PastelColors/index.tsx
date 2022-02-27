import React, { useCallback, useEffect, useState } from 'react';

import { Color } from '../../../interfaces/pastel.interface';
import PastelColor from '../../atoms/PastelColor';
import { colors } from '../../../constants/colors';

export default function Colors() {
  const drawColors = useCallback((color: Color, index: number) => {
    return <PastelColor key={index} title={color.title} hex={color.hex} />;
  }, []);

  return <div className='flex flex-wrap justify-between text-center'>{colors.map(drawColors)}</div>;
}
