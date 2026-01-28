import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slices/UserSlice';
import UserListReducer from './slices/UserListSlice';
import AuthReducer from './slices/AuthSlice' 

export const store = configureStore(
    {
        reducer : {
            user : UserReducer,
            userList : UserListReducer,
            auth : AuthReducer
        }
    }
);

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;