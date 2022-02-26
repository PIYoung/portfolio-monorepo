import { createTransform, persistReducer, persistStore } from 'redux-persist';
import { parse, stringify } from 'flatted';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import user from './user.reducer';

const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState),
);
const logger = createLogger();
const rootReducer = combineReducers({
  user,
});
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['user'],
    transforms: [transformCircular],
  },
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});
const persistor = persistStore(store);
const exportObj = {
  store,
  persistor,
};

export default exportObj;

export type RootState = ReturnType<typeof rootReducer>;
