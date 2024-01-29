import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import mainPageReducer from 'pages/MainPage/slices/mainPageSlice';

export const createReduxStore = (initialState?: StateSchema) =>
    configureStore<StateSchema>({
        reducer: { mainPagePart: mainPageReducer },
        devTools: __IS_DEV__,
        preloadedState: initialState
    });
