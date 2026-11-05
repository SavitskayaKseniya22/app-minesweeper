import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/es/storage/session';
import gameSettingsReducer from './GameSettingsSlice';
import gameCycleReducer from './GameCycleSlice';
import gameDataReducer from './GameDataSlice';
import stopwatchReducer from './StopwatchSlice';
import scoreTableReducer from './ScoreTableSlice';
import userReducer from './UserSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
};

export const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  gameSettings: gameSettingsReducer,
  gameCycle: gameCycleReducer,
  gameData: gameDataReducer,
  stopwatch: stopwatchReducer,
  scoreTable: scoreTableReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
