import { createAction, createReducer, current } from '@reduxjs/toolkit';
import { UserConfigurations } from './../interfaces/user.interface';
import update from 'immutability-helper';

const ACTIONS = <const>{
  SET_USER_CONFIGURATIONS: 'User/SET_USER_CONFIGURATIONS',
};

export const setUserConfigurations = createAction(ACTIONS.SET_USER_CONFIGURATIONS, (payload: UserConfigurations) => ({
  payload,
}));

export interface UserState {
  configurations: UserConfigurations;
}

const initialState: UserState = {
  configurations: {
    theme: 'dark',
  },
};

const userReducer = createReducer<UserState>(initialState, builder => {
  builder.addCase(setUserConfigurations, (state, action) => {
    const currState = current(state);

    return update(currState, {
      configurations: {
        $set: action.payload,
      },
    });
  });
});

export default userReducer;
