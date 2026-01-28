import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../model/user";



export interface UserListState {
    usersList?: User[],
    pending: boolean,
    isInError: boolean,
    errorMessage?: string,
    status?: number

}






const initialState: UserListState = {
    usersList: [],
    pending: false,
    isInError: false
}

export const userListSlice = createSlice(
    {
        name: 'userListSlice',
        initialState: initialState,
        reducers: {
            setUserList(state, action) {
                state.usersList = action.payload;
            },


        }
    }
);



export const {setUserList} = userListSlice.actions;
export default userListSlice.reducer;