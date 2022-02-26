import { createAction, createReducer, current } from '@reduxjs/toolkit';

import { NavigationMenu } from './../interfaces/pastel.interface';
import update from 'immutability-helper';

const ACTIONS = <const>{
  SET_PASTEL_HEADER_TITLE: 'Pastel/SET_PASTEL_HEADER_TITLE',
  SET_SELECTED_PALETTE: 'Pastel/SET_SELECTED_PALETTE',
  ADD_NEW_PASTEL_COLLECTION: 'Pastel/ADD_NEW_PASTEL_COLLECTION',
};

export const setPastelHeaderTitle = createAction(ACTIONS.SET_PASTEL_HEADER_TITLE, (payload: string) => ({ payload }));

export const setSelectedPalette = createAction(ACTIONS.SET_SELECTED_PALETTE, (payload: string) => ({ payload }));

export const addNewPastelCollection = createAction(ACTIONS.ADD_NEW_PASTEL_COLLECTION, (payload: NavigationMenu) => ({
  payload,
}));

export interface PastelState {
  headerTitle: string;
  selectedPalette: string;
  menus: NavigationMenu[];
}

const initialState: PastelState = {
  headerTitle: 'All Paletts',
  selectedPalette: '#ffffff',
  menus: [
    {
      iconKey: 0,
      title: 'Library',
      removable: false,
      children: [
        {
          iconKey: 1,
          title: 'All Paletts',
          to: '/allPaletts',
          removable: false,
        },
        {
          iconKey: 2,
          title: 'Recents',
          to: '/Recents',
          removable: false,
        },
        {
          iconKey: 3,
          title: 'Colors',
          to: '/Colors',
          removable: false,
        },
      ],
    },
    {
      iconKey: 0,
      title: 'Collections',
      removable: false,
      children: [
        {
          iconKey: 4,
          title: 'Themes',
          to: '/Themes',
          removable: true,
        },
        {
          iconKey: 4,
          title: 'Reference',
          to: '/Reference',
          removable: true,
        },
      ],
    },
  ],
};

const pastelReducer = createReducer<PastelState>(initialState, builder => {
  builder
    .addCase(setPastelHeaderTitle, (state, action) => {
      const currState = current(state);

      return update(currState, {
        headerTitle: {
          $set: action.payload,
        },
      });
    })
    .addCase(setSelectedPalette, (state, action) => {
      const currState = current(state);

      return update(currState, {
        selectedPalette: {
          $set: action.payload,
        },
      });
    })
    .addCase(addNewPastelCollection, (state, action) => {
      const currState = current(state);
      const index = 1;

      return update(currState, {
        menus: {
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
