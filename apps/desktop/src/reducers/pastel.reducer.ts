import { createAction, createReducer, current } from '@reduxjs/toolkit';

import { Color, NavigationMenu, Paletts } from './../interfaces/pastel.interface';
import update from 'immutability-helper';
import { initialPastelState } from '../constants/pastel';

const ACTIONS = <const>{
  SET_SELECTED_MENU: 'Pastel/SET_SELECTED_MENU',
  SET_SELECTED_HEX: 'Pastel/SET_SELECTED_HEX',
  SET_PALETTS_LAST_VISITED: 'Pastel/SET_PALETTS_LAST_VISITED',
  SET_CURRENT_VIEW_PALETTS: 'Pastel/SET_CURRENT_VIEW_PALETTS',
  SET_NAVIGATION_MENU_RENAME_INDEX: 'Pastel/SET_NAVIGATION_MENU_RENAME_INDEX',
  SET_PALETTS_RENAME_INDEX: 'Pastel/SET_PALETTS_RENAME_INDEX',
  SET_COLOR_RENAME_INDEX: 'Pastel/SET_COLOR_RENAME_INDEX',
  UPDATE_NAVIGATION_MENU: 'Pastel/UPDATE_NAVIGATION_MENU',
  UPDATE_PALETTS: 'Pastel/UPDATE_PALETTS',
  UPDATE_COLOR: 'Pastel/UPDATE_COLOR',
  DELETE_NAVIGATION_MENU: 'Pastel/DELETE_NAVIGATION_MENU',
  DELETE_PALETTS: 'Pastel/DELETE_PALETTS',
  DELETE_COLOR: 'Pastel/DELETE_COLOR',
  ADD_NEW_PASTEL_COLLECTION: 'Pastel/ADD_NEW_PASTEL_COLLECTION',
  ADD_NEW_PALLETS: 'Pastel/ADD_NEW_PALLETS',
  ADD_PALLETS_NEW_COLOR: 'Pastel/ADD_PALLETS_NEW_COLOR',
  ADD_NEW_COLOR: 'Pastel/ADD_NEW_COLOR',
};

export const setSelectedMenu = createAction(ACTIONS.SET_SELECTED_MENU, (payload: NavigationMenu) => ({ payload }));

export const setSelectedHex = createAction(ACTIONS.SET_SELECTED_HEX, (payload: string) => ({ payload }));

export const setPalettsLastVisited = createAction(
  ACTIONS.SET_PALETTS_LAST_VISITED,
  (payload: { date: Date; id: number }) => ({ payload }),
);

export const setCurrentViewedPalettes = createAction(ACTIONS.SET_CURRENT_VIEW_PALETTS, (payload: number) => ({
  payload,
}));

export const setNavigationMenuRenameIndex = createAction(
  ACTIONS.SET_NAVIGATION_MENU_RENAME_INDEX,
  (payload: number) => ({ payload }),
);

export const setPalettsRenameIndex = createAction(ACTIONS.SET_PALETTS_RENAME_INDEX, (payload: number) => ({ payload }));

export const setColorRenameIndex = createAction(ACTIONS.SET_COLOR_RENAME_INDEX, (payload: number) => ({ payload }));

export const updateNavigationMenu = createAction(
  ACTIONS.UPDATE_NAVIGATION_MENU,
  (payload: { index: number; title: string }) => ({ payload }),
);

export const updatePaletts = createAction(ACTIONS.UPDATE_PALETTS, (payload: { id: number; title: string }) => ({
  payload,
}));

export const updateColor = createAction(ACTIONS.UPDATE_COLOR, (payload: { index: number; title: string }) => ({
  payload,
}));

export const deleteNavigationMenu = createAction(ACTIONS.DELETE_NAVIGATION_MENU, (payload: number) => ({ payload }));

export const deletePaletts = createAction(ACTIONS.DELETE_PALETTS, (payload: number) => ({ payload }));

export const deleteColor = createAction(ACTIONS.DELETE_COLOR, (payload: number) => ({ payload }));

export const addNewPastelCollection = createAction(ACTIONS.ADD_NEW_PASTEL_COLLECTION, (payload: NavigationMenu) => ({
  payload,
}));

export const addNewPaletts = createAction(ACTIONS.ADD_NEW_PALLETS, (payload: Paletts) => ({ payload }));

export const addPalettsNewColor = createAction(
  ACTIONS.ADD_PALLETS_NEW_COLOR,
  (payload: { color: Omit<Color, 'title'>; index: number }) => ({ payload }),
);

export const addNewColor = createAction(ACTIONS.ADD_NEW_COLOR, (payload: Color) => ({ payload }));

export interface PastelState {
  paletts: Paletts[];
  currentViewedPaletts?: number;
  colors: Color[];
  selectedMenu: NavigationMenu;
  selectedHex: string;
  menus: NavigationMenu[];
  renameMenuIndex?: number;
  renamePalettsIndex?: number;
  renameColorIndex?: number;
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
      const { date, id } = action.payload;
      const index = currState.paletts.findIndex(e => e.id === id);

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
    .addCase(setNavigationMenuRenameIndex, (state, action) => {
      const currState = current(state);

      return update(currState, {
        renameMenuIndex: {
          $set: action.payload,
        },
      });
    })
    .addCase(setPalettsRenameIndex, (state, action) => {
      const currState = current(state);

      return update(currState, {
        renamePalettsIndex: {
          $set: action.payload,
        },
      });
    })
    .addCase(setColorRenameIndex, (state, action) => {
      const currState = current(state);

      return update(currState, {
        renameColorIndex: {
          $set: action.payload,
        },
      });
    })
    .addCase(updateNavigationMenu, (state, action) => {
      const currState = current(state);
      const index = 1;

      return update(currState, {
        menus: {
          [index]: {
            children: {
              [action.payload.index]: {
                title: {
                  $set: action.payload.title,
                },
              },
            },
          },
        },
      });
    })
    .addCase(updatePaletts, (state, action) => {
      const currState = current(state);
      const index = currState.paletts.findIndex(e => e.id === action.payload.id);

      return update(currState, {
        paletts: {
          [index]: {
            title: {
              $set: action.payload.title,
            },
          },
        },
      });
    })
    .addCase(updateColor, (state, action) => {
      const currState = current(state);

      return update(currState, {
        colors: {
          [action.payload.index]: {
            title: {
              $set: action.payload.title,
            },
          },
        },
      });
    })
    .addCase(deleteNavigationMenu, (state, action) => {
      const currState = current(state);
      const index = 1;

      const willBeDeletedMenu = currState.menus[index].children[action.payload];
      const willBeDeletedPaletts = currState.paletts.filter(e => e.uid === willBeDeletedMenu.uid);

      return update(currState, {
        paletts: {
          $set: currState.paletts.filter(e => !willBeDeletedPaletts.includes(e)),
        },
        menus: {
          [index]: {
            children: {
              $splice: [[action.payload, 1]],
            },
          },
        },
      });
    })
    .addCase(deletePaletts, (state, action) => {
      const currState = current(state);
      const index = currState.paletts.findIndex(e => e.id === action.payload);

      return update(currState, {
        paletts: {
          $splice: [[index, 1]],
        },
      });
    })
    .addCase(deleteColor, (state, action) => {
      const currState = current(state);

      return update(currState, {
        colors: {
          $splice: [[action.payload, 1]],
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
    .addCase(addNewPaletts, (state, action) => {
      const currState = current(state);

      return update(currState, {
        paletts: {
          $push: [action.payload],
        },
      });
    })
    .addCase(addPalettsNewColor, (state, action) => {
      const currState = current(state);
      const { color, index } = action.payload;

      return update(currState, {
        paletts: {
          [index]: {
            colors: {
              $push: [color],
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
