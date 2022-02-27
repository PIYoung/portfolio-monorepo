import { createAction, createReducer, current } from '@reduxjs/toolkit';

import { NavigationMenu } from './../interfaces/pastel.interface';
import update from 'immutability-helper';
import { initialPastelState } from '../constants/pastel';

const ACTIONS = <const>{
  SET_SELECTED_MENU: 'Pastel/SET_SELECTED_MENU',
  SET_SELECTED_HEX: 'Pastel/SET_SELECTED_HEX',
  ADD_NEW_PASTEL_COLLECTION: 'Pastel/ADD_NEW_PASTEL_COLLECTION',
};

export const setSelectedMenu = createAction(ACTIONS.SET_SELECTED_MENU, (payload: NavigationMenu) => ({ payload }));

export const setSelectedHex = createAction(ACTIONS.SET_SELECTED_HEX, (payload: string) => ({ payload }));

export const addNewPastelCollection = createAction(ACTIONS.ADD_NEW_PASTEL_COLLECTION, (payload: NavigationMenu) => ({
  payload,
}));

export interface PastelState {
  selectedMenu: NavigationMenu;
  selectedHex: string;
  menus: NavigationMenu[];
}

const initialState: PastelState = initialPastelState;

const pastelReducer = createReducer<PastelState>(initialState, builder => {
  builder
    .addCase(setSelectedMenu, (state, action) => {
      const currState = current(state);

      return update(currState, {
        selectedMenu: {
          $set: action.payload,
        },
      });
    })
    .addCase(setSelectedHex, (state, action) => {
      const currState = current(state);

      return update(currState, {
        selectedHex: {
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
