import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../model/user";


export interface AccountState  {
    userData : User,

}

const initialAccountState : AccountState = {
    userData : {
        id : 1,
        name: 'Carlo',
        surname : 'Rossi',
        email : 'carlo.rossi@unaemail.com',
        phone : '3401111111'
    }
}

export const userSlice = createSlice(
    {
        name : 'user',
        initialState : initialAccountState,
        reducers : {
            setUser : (state,action) => {
                state.userData = action.payload;
            }
        }
    }
);

export const {setUser} = userSlice.actions;
export default userSlice.reducer;