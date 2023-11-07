import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import albumReducer from './album/slice';
import photoReducer from './gallery/slice'

const store = configureStore({
  reducer: {
    album: albumReducer.reducer,
    gallery: photoReducer.reducer
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
