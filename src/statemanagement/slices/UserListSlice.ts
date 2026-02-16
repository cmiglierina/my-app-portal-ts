import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { User } from "../../model/user";
import userService from "../../service/user/userservice";
import { toast } from "react-toastify";

interface Rejresponse {
    message: string,
    status: number
}

export interface UserListState {
    usersList?: User[],
    pending: boolean,
    isInError: boolean,
    errorMessage?: string,
    status?: number,
    tokenExpired ?: boolean
}


export const deleteUserByIdT = createAsyncThunk(
    'userListSlice/deletebyid',
    async (id: string, thunkApi) => {
        try {
            const response = await userService.deleteUserById(id);
            if (!response.esito) {
                return thunkApi.rejectWithValue({ message: response.errormessage, status: response.status } as Rejresponse);
            }
            thunkApi.fulfillWithValue(id);
        } catch (error) {
            return thunkApi.rejectWithValue({ message: error instanceof Error ? error.message : 'Errore nel cancellare utente', status: 500 } as Rejresponse);
        }
    }
);



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
            onDeleteFailure(state, action) {
                const status = state.status;
                if (status) {
                    if (Number(status) === 403) {
                        state.tokenExpired = true;
                        return;
                    }

                }
                toast.error(action.payload.text, { containerId: action.payload.userid });
            },
            onDeleteSuccess(state,action) {

                state.usersList = state.usersList?.filter(u=> u.id != action.payload);

                return state;
            }


        },
        extraReducers(builder) {
            builder.addCase(deleteUserByIdT.pending, (state) => {
                state.pending = true;
                state.errorMessage = undefined;
                state.isInError = false;
            }).addCase(deleteUserByIdT.fulfilled, (state,action) => {
                state.pending = false;
                state.errorMessage = undefined;
                state.isInError = false;
                state.usersList = state.usersList?.filter(u=>u.id != action.payload);
            }).addCase(deleteUserByIdT.rejected, (state, action) => {
                state.pending = false;
                state.errorMessage = action.error.message || action.payload.message || 'errore nel delete utente';
                state.isInError = false;
                state.status = action.payload.status;
            })
        },
    }
);



export const { setUserList,onDeleteFailure,onDeleteSuccess } = userListSlice.actions;
export default userListSlice.reducer;