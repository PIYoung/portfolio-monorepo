import * as Styled from './styled';

import { BsClock, BsFolder, BsGrid, BsViewStacked } from 'react-icons/bs';
import React, { useCallback } from 'react';

import { NavigationMenu } from '../../../interfaces/pastel.interface';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  childrenMenu: NavigationMenu[];
}

export default function PastelNavigationMenu({ title, childrenMenu }: Props) {
  const navigate = useNavigate();

  const moveTo = useCallback(
    (to: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      return navigate(to);
    },
    [navigate],
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
        <div key={index} className='ml-2 flex text-xs mb-2 cursor-pointer' onClick={moveTo.bind(null, menu.to)}>
          <div className='mr-2'>{Icon}</div>
          <div>{menu.title}</div>
        </div>
      );
    },
    [moveTo],
  );

  return (
    <Styled.Container className='mb-2'>
      <div className='text-xs mb-2'>{title}</div>
      {childrenMenu.map(drawChildrenMenu)}
    </Styled.Container>
  );
}