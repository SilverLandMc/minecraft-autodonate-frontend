import { configureStore } from '@reduxjs/toolkit';
import adminPageReducer from 'pages/AdminPage/slices/adminPageSlice';
import mainPageReducer from 'pages/MainPage/slices/mainPageSlice';
import shopPageReducer from 'pages/ShopPage/slices/shopPageSlice';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) =>
    configureStore<StateSchema>({
        reducer: { mainPagePart: mainPageReducer, shopPagePart: shopPageReducer, adminPagePart: adminPageReducer },
        devTools: __IS_DEV__,
        preloadedState: initialState
    });
