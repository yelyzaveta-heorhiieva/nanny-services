import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice';
import modalReducer from './modalSlice';
import nanniesReducer, { NanniesState } from './nanniesSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const persistedAuthReducer = persistReducer<AuthState>(
  { key: 'auth', storage },
  authReducer,
);

export const persistedNanniesReducer = persistReducer<NanniesState>(
  { key: 'favorite', storage },
  nanniesReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    modal: modalReducer,
    nannies: persistedNanniesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
