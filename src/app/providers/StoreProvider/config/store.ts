import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import mainPageReducer from 'pages/MainPage/slices/mainPageSlice';
import shopPageReducer from 'pages/ShopPage/slices/shopPageSlice';
import adminPageReducer from 'pages/AdminPage/slices/adminPageSlice';

export const createReduxStore = (initialState?: StateSchema) =>
    configureStore<StateSchema>({
        reducer: { mainPagePart: mainPageReducer, shopPagePart: shopPageReducer, adminPagePart: adminPageReducer },
        devTools: __IS_DEV__,
        preloadedState: initialState
    });
