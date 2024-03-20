import { createSlice } from '@reduxjs/toolkit';

export interface AdminPagePartState {
    isUserRequestFinished: boolean;
    isAuthPageVisited: boolean;
    isAdmin: boolean;
}

const initialState: AdminPagePartState = {
    isUserRequestFinished: false,
    isAuthPageVisited: false,
    isAdmin: false
};

export const adminPageSlice = createSlice({
    name: 'adminPagePart',
    initialState,
    reducers: {
        setUserRequestFinished: (state) => {
            state.isUserRequestFinished = true;
        },
        setAuthPageVisited: (state) => {
            state.isAuthPageVisited = true;
        },
        setAdmin: (state) => {
            state.isAdmin = true;
        }
    }
});

export const { setUserRequestFinished, setAuthPageVisited, setAdmin } = adminPageSlice.actions;

export default adminPageSlice.reducer;
