import { createAction, createReducer, current } from '@reduxjs/toolkit';
import { UserConfigurations } from './../interfaces/user.interface';
import update from 'immutability-helper';

const ACTIONS = <const>{
  SET_USER_CONFIGURATIONS: 'User/SET_USER_CONFIGURATIONS',
  RESTART_INTRO: 'User/RESTART_INTRO',
};

export const setUserConfigurations = createAction(ACTIONS.SET_USER_CONFIGURATIONS, (payload: 'dark' | 'light') => ({
  payload,
}));

export const restartIntro = createAction(ACTIONS.RESTART_INTRO, (payload: boolean) => ({ payload }));

export interface UserState {
  configurations: UserConfigurations;
}

const initialState: UserState = {
  configurations: {
    theme: 'dark',
    showIntro: true,
  },
};

const userReducer = createReducer<UserState>(initialState, builder => {
  builder
    .addCase(setUserConfigurations, (state, action) => {
      const currState = current(state);

      return update(currState, {
        configurations: {
          theme: {
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
