import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    username: string;
}

const initialState: UserState = {
    username: 'noUser',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;