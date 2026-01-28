import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../model/user";
import { updateUser } from "../../service/UserService";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";


export interface AccountState  {
    userData ?: User,
    pending : boolean,
    status?: number,
    tokenExpired : boolean

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

            if ( !userData.id) {

                const userid = secureLocalStorage.getItem('userid');
                if ( userid && typeof userid === 'number') {
                    userData.id = userid;
                }
            }
            const response = await updateUser(userData);
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.message, status : response.status } as Rejresponse);
            }
            

            return response.user;
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
                    if ( Number(status) === 403 ) {
                        state.tokenExpired = true;
                        return;
                    }

                }
                toast.error(action.payload);

            }
        },
        extraReducers : (builder) => {
            builder.addCase(updateUserData.pending,(state:AccountState) => {
                state.pending = true;
                state.tokenExpired = false;
                state.status = 0;
            }).addCase(updateUserData.fulfilled,(state:AccountState,action) => {
                state.pending = false;
                state.tokenExpired = false;
                state.status = 200;
                state.userData = action.payload;
            }).addCase(updateUserData.rejected,(state:AccountState,action) => {
                state.pending = false;
                state.tokenExpired = false;
                state.status = action.payload.status;

            });
        }
    }
);

export const {setUser, updateFailure} = userSlice.actions;
export default userSlice.reducer;