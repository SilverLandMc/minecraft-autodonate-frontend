import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OnlineDto } from 'app/types/api/apiTypesHelper';

export interface MainPagePartState extends OnlineDto {}

export const mainPageSlice = createSlice({
    name: 'mainPagePart',
    initialState: {
        online: 0,
        max: 100
    },
    reducers: {
        setOnline: (state, action: PayloadAction<OnlineDto>) => {
            state.online = action.payload.online;
            state.max = action.payload.max;
        }
    }
});

export const { setOnline } = mainPageSlice.actions;

export default mainPageSlice.reducer;
