import { Color, Paletts } from '../../../interfaces';
import React, { useCallback } from 'react';

interface Props {
  item: Paletts;
}

export default function PalettsItem({ item }: Props) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      console.log(item);
    },
    [item],
  );

  const drawItems = useCallback(
    (e: Omit<Color, 'title'>, index: number) => {
      const lines = item.colors.length / 8;
      let width: string, height: string;
      if (lines > 1) {
        width = `${200 / 8}px`;
        height = `${60 / lines}px`;
      } else {
        width = `${200 / item.colors.length}px`;
        height = '60px';
      }

      return <div key={index} className='flex-grow' style={{ backgroundColor: e.hex, width, height }} />;
    },
    [item],
  );

  return (
    <div className='mb-8' style={{ width: '200px', height: '100px' }}>
      <div className='rounded-md overflow-hidden' onClick={handleClick}>
        <div className='flex flex-wrap '>{item.colors.map(drawItems)}</div>
      </div>
      <div className='text-sm' style={{ color: 'var(--color-pastel-text)' }}>
        {item.title}
      </div>
    </div>
  );
}
