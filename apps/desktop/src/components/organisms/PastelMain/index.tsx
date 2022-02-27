import * as Styled from './styled';

import React, { useCallback } from 'react';

import DroppableItem from '../../templates/DroppableItem';
import PastelColors from '../../molecules/PastelColors';
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default function PastelMain() {
  const { selectedMenu } = useSelector((state: RootState) => state.pastel);

  const drawMain = useCallback(() => {
    switch (selectedMenu.uid) {
      case 1:
        break;

      case 2:
        break;

      case 3:
        return <PastelColors />;

      case 4:
        break;

      case 5:
        break;

      default:
        break;
    }

    return <div>This should not happen</div>;
  }, [selectedMenu]);

  return (
    <Styled.Container className='p-4'>
      <DroppableItem>{drawMain()}</DroppableItem>
    </Styled.Container>
  );
}
