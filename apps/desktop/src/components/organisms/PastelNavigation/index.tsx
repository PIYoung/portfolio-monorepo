import * as Styled from './styled';

import React, { useCallback } from 'react';

import { NavigationMenu } from '../../../interfaces/pastel.interface';
import PastelNavigationMenu from '../../molecules/PastelNavigationMenu';
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default function PastelNavigation() {
  const { menus } = useSelector((state: RootState) => state.pastel);

  const drawMenus = useCallback((menu: NavigationMenu, index: number) => {
    return <PastelNavigationMenu key={index} title={menu.title} childrenMenu={menu.children} />;
  }, []);

  return <Styled.Container className='pt-16 p-4'>{menus.map(drawMenus)}</Styled.Container>;
}
