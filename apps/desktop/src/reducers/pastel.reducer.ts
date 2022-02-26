import { createAction, createReducer, current } from '@reduxjs/toolkit';

import { NavigationMenu } from './../interfaces/pastel.interface';
import update from 'immutability-helper';

const ACTIONS = <const>{
  ADD_NEW_PASTEL_COLLECTION: 'Pastel/ADD_NEW_PASTEL_COLLECTION',
};

export const addNewPastelCollection = createAction(ACTIONS.ADD_NEW_PASTEL_COLLECTION, (payload: NavigationMenu) => ({
  payload,
}));

export interface PastelState {
  defaultMenus: NavigationMenu[];
  myMenus: NavigationMenu[];
}

const initialState: PastelState = {
  defaultMenus: [
    {
      iconKey: 0,
      title: 'Library',
      children: [
        {
          iconKey: 1,
          title: 'All Paletts',
          to: '/',
        },
        {
          iconKey: 2,
          title: 'Recents',
          to: '/',
        },
        {
          iconKey: 3,
          title: 'Colors',
          to: '/',
        },
      ],
    },
  ],
  myMenus: [
    {
      iconKey: 4,
      title: 'Collections',
      children: [
        {
          iconKey: 4,
          title: 'Themes',
          to: '/',
        },
        {
          iconKey: 4,
          title: 'Reference',
          to: '/',
        },
      ],
    },
  ],
};

const pastelReducer = createReducer<PastelState>(initialState, builder => {
  builder.addCase(addNewPastelCollection, (state, action) => {
    const currState = current(state);
    const index = 0;

    return update(currState, {
      myMenus: {
        [index]: {
          children: {
            $push: [action.payload],
          },
        },
      },
    });
  });
});

export default pastelReducer;
