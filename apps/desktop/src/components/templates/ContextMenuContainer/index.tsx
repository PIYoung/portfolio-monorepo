import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  deleteColor,
  deleteNavigationMenu,
  deletePaletts,
  setColorRenameIndex,
  setNavigationMenuRenameIndex,
  setPalettsRenameIndex,
} from '../../../reducers/pastel.reducer';

import { useDispatch } from 'react-redux';

export default function ContextMenuContainer({ children }) {
  const dispatch = useDispatch();
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [type, setType] = useState<string>('');
  const [menuIndex, setMenuIndex] = useState<number>(0);
  const [palettsIndex, setPalettsIndex] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0);

  const drawContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    if (target instanceof HTMLDivElement) {
      if (target.dataset.removable === 'true') {
        switch (target.dataset.type) {
          case 'menu':
            setType(target.dataset.type);
            setMenuIndex(Number(target.dataset.index));
            break;

          case 'paletts':
            setType(target.dataset.type);
            setPalettsIndex(Number(target.dataset.index));
            break;

          case 'colors':
            setType(target.dataset.type);
            setColorIndex(Number(target.dataset.index));
            break;

          default:
            break;
        }

        setTop(e.pageY);
        setLeft(e.pageX);
        setShowContextMenu(true);
      }
    }
  }, []);

  const removeContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(setNavigationMenuRenameIndex(null));
      dispatch(setPalettsRenameIndex(null));
      dispatch(setColorRenameIndex(null));
      setShowContextMenu(false);
      setMenuIndex(0);
      setPalettsIndex(0);
      setColorIndex(0);
      setType('');
    },
    [dispatch],
  );

  const rename = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      switch (type) {
        case 'menu':
          dispatch(setNavigationMenuRenameIndex(menuIndex));
          break;

        case 'paletts':
          dispatch(setPalettsRenameIndex(palettsIndex));
          break;

        case 'colors':
          dispatch(setColorRenameIndex(colorIndex));
          break;

        default:
          break;
      }

      setShowContextMenu(false);
      setMenuIndex(0);
      setPalettsIndex(0);
      setColorIndex(0);
      setType('');
    },
    [menuIndex, palettsIndex, colorIndex, type, dispatch],
  );

  const remove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      switch (type) {
        case 'menu':
          dispatch(deleteNavigationMenu(menuIndex));
          break;

        case 'paletts':
          dispatch(deletePaletts(palettsIndex));
          break;

        case 'colors':
          dispatch(deleteColor(colorIndex));
          break;

        default:
          break;
      }

      setShowContextMenu(false);
      setMenuIndex(0);
      setPalettsIndex(0);
      setColorIndex(0);
      setType('');
    },
    [menuIndex, palettsIndex, colorIndex, type, dispatch],
  );

  useLayoutEffect(() => {
    dispatch(setNavigationMenuRenameIndex(null));
    dispatch(setPalettsRenameIndex(null));
    dispatch(setColorRenameIndex(null));
    setShowContextMenu(false);
    setMenuIndex(0);
    setPalettsIndex(0);
    setColorIndex(0);
    setType('');
  }, [dispatch]);

  return (
    <div className='relative' onClick={removeContextMenu} onContextMenu={drawContextMenu}>
      {children}
      {showContextMenu && (
        <div className='absolute rounded-md' style={{ top, left, backgroundColor: 'var(--color-primary)' }}>
          <div onClick={rename} className='text-sm rounded-t-md hover:bg-slate-500 hover:text-gray-200 p-3'>
            Rename
          </div>
          <div onClick={remove} className='text-sm rounded-b-md hover:bg-slate-500 hover:text-gray-200 p-3'>
            Delete
          </div>
        </div>
      )}
    </div>
  );
}
