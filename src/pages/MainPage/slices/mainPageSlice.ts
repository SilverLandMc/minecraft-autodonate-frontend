import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerInfoOutDto, Players } from 'app/types/api/apiTypes';

export interface MainPagePartState extends Players {
    isLoaded: boolean;
    userNickname?: string;
    userUniqueProducts: string[];
}

const initialState: MainPagePartState = {
    online: 0,
    max: 100,
    isLoaded: false,
    userUniqueProducts: []
};

export const mainPageSlice = createSlice({
    name: 'mainPagePart',
    initialState,
    reducers: {
        setOnline: (state, action: PayloadAction<Players>) => {
            state.online = action.payload.online;
            state.max = action.payload.max;
            state.isLoaded = true;
        },
        setUserInfo: (state, action: PayloadAction<PlayerInfoOutDto>) => {
            state.userNickname = action.payload.playerName;
            state.userUniqueProducts = action.payload.uniqueProducts;
        }
    }
});

export const { setOnline, setUserInfo } = mainPageSlice.actions;

export default mainPageSlice.reducer;
