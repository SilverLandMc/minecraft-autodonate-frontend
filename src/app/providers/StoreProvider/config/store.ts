import { configureStore } from '@reduxjs/toolkit';
import adminPageReducer from 'pages/adminPage/slices/adminPageSlice';
import shopPageReducer from 'pages/shopPage/slices/shopPageSlice';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) =>
    configureStore<StateSchema>({
        reducer: { shopPagePart: shopPageReducer, adminPagePart: adminPageReducer },
        devTools: __IS_DEV__,
        preloadedState: initialState
    });
