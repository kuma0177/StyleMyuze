import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/AuthSlice';
import conversationReducer from './slices/ConversationSlice';
import asyncReducer from './slices/Async';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['conversation'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  conversation: conversationReducer,
  async: asyncReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
