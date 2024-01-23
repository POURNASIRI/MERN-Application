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
        }
    }
})


export default userSlice.reducer
export const {signInUser,signInSuccess,signInFailure} = userSlice.actions