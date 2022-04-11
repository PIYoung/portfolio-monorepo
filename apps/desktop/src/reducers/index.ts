import { createTransform, persistReducer, persistStore } from 'redux-persist';
import { parse, stringify } from 'flatted';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import pastel from './pastel.reducer';
import storage from 'redux-persist/lib/storage';
import user from './user.reducer';

const middleware = [];
const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState),
);
const rootReducer = combineReducers({
  user,
  pastel,
});
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['user', 'pastel'],
    transforms: [transformCircular],
  },
  rootReducer,
);

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});
const persistor = persistStore(store);
const exportObj = {
  store,
  persistor,
};

export default exportObj;

export type RootState = ReturnType<typeof rootReducer>;
