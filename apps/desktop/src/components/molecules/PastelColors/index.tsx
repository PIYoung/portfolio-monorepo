import React, { useCallback } from 'react';

import { Color } from '../../../interfaces/pastel.interface';
import PastelColor from '../../atoms/PastelColor';
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

interface Props {
  palettsColors?: Omit<Color, 'title'>[];
}

export default function Colors({ palettsColors }: Props) {
  const { colors } = useSelector((state: RootState) => state.pastel);

  const drawColors = useCallback((color: Color, index: number) => {
    return <PastelColor key={index} title={color.title} hex={color.hex} />;
  }, []);

  return (
    <div className='flex flex-wrap justify-between text-center'>
      {palettsColors ? palettsColors.map(drawColors) : colors.map(drawColors)}
    </div>
  );
}
