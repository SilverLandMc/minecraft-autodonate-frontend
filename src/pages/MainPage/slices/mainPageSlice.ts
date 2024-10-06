import { safeLocalStorage } from '@37bytes/storage-fallback';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerInfoOutDto, Players } from 'app/types/api/apiTypes';
import LocalStorageKey from 'shared/const/enum/localStorageKey';

export interface MainPagePartState extends Players {
    isLoaded: boolean;
    playerName?: string;
    playerUniqueProducts: string[];
}

const initialState: MainPagePartState = {
    online: 0,
    max: 100,
    isLoaded: false,
    playerUniqueProducts: [],
    playerName: safeLocalStorage.getItem(LocalStorageKey.PLAYER_NAME)
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
            state.playerName = action.payload.playerName;
            state.playerUniqueProducts = action.payload.uniqueProducts;
            safeLocalStorage.setItem(LocalStorageKey.PLAYER_NAME, action.payload.playerName);
        },
        erasePlayerInfo: (state) => {
            state.playerName = undefined;
            state.playerUniqueProducts = [];
            safeLocalStorage.removeItem(LocalStorageKey.PLAYER_NAME);
        }
    }
});

export const { setOnline, setUserInfo, erasePlayerInfo } = mainPageSlice.actions;

export default mainPageSlice.reducer;
