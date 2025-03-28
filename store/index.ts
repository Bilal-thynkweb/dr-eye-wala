import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from '../src/features/user';
import productReducer from '../src/features/products';

// Import your reducers here
// import counterReducer from './slices/counterSlice';
// import userReducer from './slices/userSlice';

const rootReducers = combineReducers({
  user: userReducer,
  products: productReducer
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['HYDRATE']
      }
    }),
  // Optional: Add middleware or configure devtools
  devTools: process.env.NODE_ENV !== 'production'
});

// Type definitions for Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
