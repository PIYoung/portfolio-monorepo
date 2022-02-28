import { createAction, createReducer, current } from '@reduxjs/toolkit';
import { UserConfigurations, HexEvent } from './../interfaces/user.interface';
import update from 'immutability-helper';

const ACTIONS = <const>{
  SET_THEME: 'User/SET_THEME',
  SET_HEX_EVENT: 'User/SET_HEX_EVENT',
  RESTART_INTRO: 'User/RESTART_INTRO',
};

export const setTheme = createAction(ACTIONS.SET_THEME, (payload: 'dark' | 'light') => ({
  payload,
}));

export const setHexEvent = createAction(ACTIONS.SET_HEX_EVENT, (payload: HexEvent) => ({ payload }));

export const restartIntro = createAction(ACTIONS.RESTART_INTRO, (payload: boolean) => ({ payload }));

export interface UserState {
  configurations: UserConfigurations;
}

const initialState: UserState = {
  configurations: {
    theme: 'dark',
    showIntro: true,
    hexEvent: 'bounce',
  },
};

const userReducer = createReducer<UserState>(initialState, builder => {
  builder
    .addCase(setTheme, (state, action) => {
      const currState = current(state);

      return update(currState, {
        configurations: {
          theme: {
            $set: action.payload,
          },
        },
      });
    })
    .addCase(setHexEvent, (state, action) => {
      const currState = current(state);

      return update(currState, {
        configurations: {
          hexEvent: {
            $set: action.payload,
          },
        },
      });
    })
    .addCase(restartIntro, (state, action) => {
      const currState = current(state);

      return update(currState, {
        configurations: {
          showIntro: {
            $set: action.payload,
          },
        },
      });
    });
});

export default userReducer;
