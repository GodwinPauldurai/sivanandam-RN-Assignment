import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';


interface UserState {
    user: {
        uid: string;
        email : string;
        displayName: string;
    } | null;
    isAuthenticated: boolean;
}

const initialState : UserState = {
    user: null,
    isAuthenticated: false
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action : PayloadAction<UserState["user"]>) => {
            state.user = action.payload;
        },
    },
})

export const { setUser } = userSlice.actions
export const selectCount = (state: RootState) => state.user
export default userSlice.reducer