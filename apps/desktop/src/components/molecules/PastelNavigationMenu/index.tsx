import * as Styled from './styled';

import { BsClock, BsFolder, BsGrid, BsViewStacked } from 'react-icons/bs';
import React, { useCallback } from 'react';
import { setNavigationMenuRenameIndex, setSelectedMenu, updateNavigationMenu } from '../../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationMenu } from '../../../interfaces/pastel.interface';
import { PATHS } from '../../../constants';
import { RootState } from '../../../reducers';
import { useNavigate } from 'react-router-dom';

interface Props {
  pIndex: number;
  title: string;
  childrenMenu: NavigationMenu[];
}

export default React.memo(function PastelNavigationMenu({ pIndex, title, childrenMenu }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { renameMenuIndex } = useSelector((state: RootState) => state.pastel);

  const moveTo = useCallback(
    (menu: NavigationMenu, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(setSelectedMenu(menu));
      navigate(PATHS.PASTEL);
    },
    [navigate, dispatch],
  );

  const renameMenu = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target;
      if (target instanceof HTMLInputElement) {
        if (e.key === 'Enter') {
          dispatch(
            updateNavigationMenu({
              index: renameMenuIndex,
              title: target.value,
            }),
          );
          dispatch(setNavigationMenuRenameIndex(null));
        }
      }
    },
    [renameMenuIndex, dispatch],
  );

  const drawChildrenMenu = useCallback(
    (menu: NavigationMenu, index: number) => {
      let Icon: JSX.Element;

      switch (menu.iconKey) {
        case 1:
          Icon = <BsViewStacked />;
          break;

        case 2:
          Icon = <BsClock />;
          break;

        case 3:
          Icon = <BsGrid />;
          break;

        case 4:
          Icon = <BsFolder />;
          break;

        default:
          break;
      }

      return (
        <div
          data-type={'menu'}
          data-removable={menu.removable}
          data-index={index}
          key={index}
          className={`piystel-${menu.to} ml-2 flex text-xs mb-2 cursor-pointer`}
          onClick={moveTo.bind(null, menu)}>
          <div data-type={'menu'} data-removable={menu.removable} data-index={index} className='mr-2'>
            {Icon}
          </div>
          {pIndex === 1 && renameMenuIndex === index ? (
            <input
              onKeyPress={renameMenu}
              className='rounded-sm pl-1 text-xs'
              style={{
                backgroundColor: 'var(--color-pastel-background)',
                width: '100px',
              }}
              autoFocus={true}
              placeholder={menu.title}
            />
          ) : (
            <div data-type={'menu'} data-removable={menu.removable} data-index={index}>
              {menu.title}
            </div>
          )}
        </div>
      );
    },
    [renameMenuIndex, pIndex, moveTo, renameMenu],
  );

  return (
    <Styled.Container className='mb-2'>
      <div className='text-xs mb-2'>{title}</div>
      {childrenMenu.map(drawChildrenMenu)}
    </Styled.Container>
  );
});
