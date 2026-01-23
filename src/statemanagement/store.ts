import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slices/UserSlice';
import UserListReducer from './slices/UserListSlice';

export const store = configureStore(
    {
        reducer : {
            user : UserReducer,
            userList : UserListReducer
        }
    }
);


export default store;