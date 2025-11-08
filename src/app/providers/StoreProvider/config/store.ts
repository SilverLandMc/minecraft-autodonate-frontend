import { configureStore } from '@reduxjs/toolkit';
import adminPageReducer from '@/pages/adminPage/slices/adminPageSlice';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) =>
    configureStore<StateSchema>({
        reducer: { adminPagePart: adminPageReducer },
        devTools: __IS_DEV__,
        preloadedState: initialState
    });
