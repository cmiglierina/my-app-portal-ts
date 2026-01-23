import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../model/user";


export interface UserListState  {
    usersList : User[],

}

const users = [{
        id: 1,
        name: 'Carlo',
        surname: 'Rossi',
        email: 'carlo.rossi@unaemail.com',
        phone: '3401111111'
    },
    {
        id: 2,
        name: 'Giovanni',
        surname: 'Bianchi',
        email: 'giovanni.bianchi@unaemail.com',
        phone: '3401111111'
    },
    {
        id: 3,
        name: 'Nadia',
        surname: 'Rossi',
        email: 'nadia.rossi@unaemail.com',
        phone: '3401111111'
    },];

const initialState : UserListState = {
    usersList : users,
}

export const userListSlice = createSlice (
    {
        name : 'userListSlice',
        initialState : initialState,
        reducers : {

        }
    }
);




export default userListSlice.reducer;