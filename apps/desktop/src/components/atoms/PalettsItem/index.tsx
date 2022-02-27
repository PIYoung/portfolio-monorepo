import { Color, Paletts } from '../../../interfaces';
import React, { useCallback } from 'react';

interface Props {
  item: Paletts;
}

export default function PalettsItem({ item }: Props) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('hi');
  }, []);

  const drawItems = useCallback((item: Omit<Color, 'title'>, index: number) => {
    return <div className={`w-10 h-24`} key={index} style={{ backgroundColor: item.hex }} />;
  }, []);

  return (
    <div>
      <div className='rounded-md overflow-hidden' onClick={handleClick}>
        <div className='flex flex-wrap'>{item.colors.map(drawItems)}</div>
      </div>
      <div className='text-sm' style={{ color: 'var(--color-pastel-text)' }}>
        {item.title}
      </div>
    </div>
  );
}
