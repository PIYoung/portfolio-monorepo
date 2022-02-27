import { createAction, createReducer, current } from '@reduxjs/toolkit';

import { Color, NavigationMenu, Paletts } from './../interfaces/pastel.interface';
import update from 'immutability-helper';
import { initialPastelState } from '../constants/pastel';

const ACTIONS = <const>{
  SET_SELECTED_MENU: 'Pastel/SET_SELECTED_MENU',
  SET_SELECTED_HEX: 'Pastel/SET_SELECTED_HEX',
  SET_PALETTS_LAST_VISITED: 'Pastel/SET_PALETTS_LAST_VISITED',
  SET_CURRENT_VIEW_PALETTS: 'Pastel/SET_CURRENT_VIEW_PALETTS',
  ADD_NEW_PASTEL_COLLECTION: 'Pastel/ADD_NEW_PASTEL_COLLECTION',
  ADD_NEW_COLOR: 'Pastel/ADD_NEW_COLOR',
};

export const setSelectedMenu = createAction(ACTIONS.SET_SELECTED_MENU, (payload: NavigationMenu) => ({ payload }));

export const setSelectedHex = createAction(ACTIONS.SET_SELECTED_HEX, (payload: string) => ({ payload }));

export const setPalettsLastVisited = createAction(
  ACTIONS.SET_PALETTS_LAST_VISITED,
  (payload: { date: Date; index: number }) => ({ payload }),
);

export const setCurrentViewedPalettes = createAction(ACTIONS.SET_CURRENT_VIEW_PALETTS, (payload: number) => ({
  payload,
}));

export const addNewPastelCollection = createAction(ACTIONS.ADD_NEW_PASTEL_COLLECTION, (payload: NavigationMenu) => ({
  payload,
}));

export const addNewColor = createAction(ACTIONS.ADD_NEW_COLOR, (payload: Color) => ({ payload }));

export interface PastelState {
  paletts: Paletts[];
  currentViewedPaletts?: number;
  colors: Color[];
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
    .addCase(setPalettsLastVisited, (state, action) => {
      const currState = current(state);
      const { date, index } = action.payload;

      return update(currState, {
        paletts: {
          [index]: {
            lastVisited: {
              $set: date,
            },
          },
        },
      });
    })
    .addCase(setCurrentViewedPalettes, (state, action) => {
      const currState = current(state);

      return update(currState, {
        currentViewedPaletts: {
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
    })
    .addCase(addNewColor, (state, action) => {
      const currState = current(state);

      return update(currState, {
        colors: {
          $push: [action.payload],
        },
      });
    });
});

export default pastelReducer;
