import { Color, Paletts } from '../../../interfaces';
import React, { useCallback } from 'react';
import { setPalettsRenameIndex, updatePaletts } from '../../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../reducers';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: Paletts;
}

export default React.memo(function PalettsItem({ item }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { renamePalettsIndex } = useSelector((state: RootState) => state.pastel);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      navigate(`/paletts/${item.id}`);
    },
    [item, navigate],
  );

  const renamePaletts = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target;
      if (target instanceof HTMLInputElement) {
        if (e.key === 'Enter') {
          dispatch(
            updatePaletts({
              id: renamePalettsIndex,
              title: target.value,
            }),
          );
          dispatch(setPalettsRenameIndex(null));
        }
      }
    },
    [renamePalettsIndex, dispatch],
  );

  const drawItems = useCallback(
    (e: Omit<Color, 'title'>, index: number) => {
      const lines = item.colors.length / 8;
      let width: string, height: string;
      if (lines > 1) {
        width = `${200 / 8}px`;
        height = `${60 / Math.ceil(lines)}px`;
      } else {
        width = `${200 / item.colors.length}px`;
        height = '60px';
      }

      return (
        <div
          data-type={'paletts'}
          data-removable={item.removable}
          data-index={item.id}
          key={index}
          className='flex-grow'
          style={{ backgroundColor: e.hex, width, height }}
        />
      );
    },
    [item],
  );

  return (
    <div
      className={`${item.removable ? 'piystel-paletts' : ''} mb-8 cursor-pointer`}
      style={{ width: '200px', height: '100px' }}
      onClick={handleClick}>
      <div className='rounded-md overflow-hidden box-border' style={{ boxShadow: 'var(--box-shadow)' }}>
        <div className='flex flex-wrap'>{item.colors.map(drawItems)}</div>
      </div>
      <div
        data-type={'paletts'}
        data-removable={item.removable}
        data-index={item.id}
        className='text-sm truncate'
        style={{ color: 'var(--color-pastel-text)' }}>
        {renamePalettsIndex === item.id ? (
          <input
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onKeyPress={renamePaletts}
            className='rounded-sm pl-1 text-xs'
            style={{
              backgroundColor: 'var(--color-pastel-background)',
              width: '100%',
            }}
            autoFocus={true}
            placeholder={item.title}
          />
        ) : (
          item.title
        )}
      </div>
    </div>
  );
});
