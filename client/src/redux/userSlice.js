import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isLoading:false,
        error:null,

    },
    reducers:{
        signInUser(state){
            state.isLoading = true;
            state.error = null
        },
        signInSuccess(state,action){
            state.isLoading = false;
            state.currentUser = action.payload,
            state.error=null
        },
        signInFailure(state,action){
            state.isLoading = false;
            state.error = action.payload
        },
        updateUserStart(state){
            state.isLoading = true;
        },
        updateUserSuccess(state,action){
            state.isLoading = false;
            state.currentUser = action.payload
        },
        updateUserFailure(state){
            state.isLoading = false,
            state.error = action.payload
        }

    }
})


export default userSlice.reducer
export const {signInUser,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure} = userSlice.actions