import * as Styled from './styled';

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BsPlusCircle } from 'react-icons/bs';
import { NavigationMenu } from '../../../interfaces/pastel.interface';
import PastelNavigationMenu from '../../molecules/PastelNavigationMenu';
import { RootState } from '../../../reducers';
import { addNewPastelCollection } from '../../../reducers/pastel.reducer';

export default React.memo(function PastelNavigation() {
  const { menus } = useSelector((state: RootState) => state.pastel);
  const dispatch = useDispatch();

  const drawMenus = useCallback((menu: NavigationMenu, index: number) => {
    return <PastelNavigationMenu key={index} title={menu.title} childrenMenu={menu.children} />;
  }, []);

  const addCollection = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const collections = menus[1].children;
      const collectionsLength = collections.length;
      const lastUid = collections[collectionsLength - 1].uid;

      dispatch(
        addNewPastelCollection({
          uid: lastUid + 1,
          title: 'New Collection',
          iconKey: 4,
          to: '/',
          removable: true,
        }),
      );
    },
    [dispatch, menus],
  );

  return (
    <Styled.Container className='pt-16 p-4'>
      {menus.map(drawMenus)}
      <div
        style={{ color: 'var(--color-pastel-text' }}
        className='text-xs flex leading-3 cursor-pointer absolute bottom-4'
        onClick={addCollection}>
        <div className='mr-1'>
          <BsPlusCircle />
        </div>
        <div>New Collection</div>
      </div>
    </Styled.Container>
  );
});
