import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Players } from 'app/types/api/apiTypes';

export interface MainPagePartState extends Players {
    isLoaded: boolean;
}

export const mainPageSlice = createSlice({
    name: 'mainPagePart',
    initialState: {
        online: 0,
        max: 100,
        isLoaded: false
    },
    reducers: {
        setOnline: (state, action: PayloadAction<Players>) => {
            state.online = action.payload.online;
            state.max = action.payload.max;
            state.isLoaded = true;
        }
    }
});

export const { setOnline } = mainPageSlice.actions;

export default mainPageSlice.reducer;
