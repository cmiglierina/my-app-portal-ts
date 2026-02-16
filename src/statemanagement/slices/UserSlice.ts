import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../model/user";
import { toast } from "react-toastify";
import userService from "../../service/user/userservice";



export interface AccountState  {
    userData ?: User,
    pending : boolean,
    status?: number,
    tokenExpired : boolean,
    message?: string,

}

const initialAccountState : AccountState = {
    pending: false,
    
    tokenExpired : false
}

interface Rejresponse {
    message : string,
    status : number
}

export const updateUserData = createAsyncThunk(
    'user/updateuser',
    async (userData: User, thunkApi) => {
        try {


            const response = await userService.updateUser(userData);
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.errormessage, status : response.status } as Rejresponse);
            }

            
        } catch (error) {
            return thunkApi.rejectWithValue({message: error instanceof Error ? error.message : 'errore in aggiornamento user', status:500} as Rejresponse ) ;
        }
    }
);



export const userSlice = createSlice(
    {
        name : 'user',
        initialState : initialAccountState,
        reducers : {
            setUser : (state,action) => {
                state.userData = action.payload;
            },
            updateFailure(state,action) {
                const status = state.status;
                if ( status ) {
                    if ( Number(status) === 403 || Number(status) === 401 ) {
                        state.tokenExpired = true;
                        return;
                    }

                }
                toast.error(action.payload.text,{containerId:action.payload.userid});

            }
        },
        extraReducers : (builder) => {
            builder.addCase(updateUserData.pending,(state:AccountState) => {
                state.pending = true;
                state.tokenExpired = false;
                state.status = 0;
            }).addCase(updateUserData.fulfilled,(state:AccountState) => {
                state.pending = false;
                state.tokenExpired = false;
                state.status = 200;
            }).addCase(updateUserData.rejected,(state:AccountState,action) => {
                state.pending = false;
                state.tokenExpired = false;
                state.status = 500;
                state.message = action.error.message;
            });
        }
    }
);

export const {setUser, updateFailure} = userSlice.actions;
export default userSlice.reducer;