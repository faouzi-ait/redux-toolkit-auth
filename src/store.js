import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import * as PER from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

import authReducer from './redux/slices/authSlice'
import { apiSlice } from './redux/apiServices/apiSlice';
import { apiMemoSlice } from './redux/apiServices/apiMemo';

export const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiMemoSlice.reducerPath]: apiMemoSlice.reducer
});

export const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = PER.persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PER.FLUSH, PER.REHYDRATE, PER.PAUSE, PER.PERSIST, PER.PURGE, PER.REGISTER],
      },
    }).concat([apiSlice.middleware, apiMemoSlice.middleware]),
    devTools: true
});

setupListeners(store.dispatch);

export const persistor = PER.persistStore(store);
