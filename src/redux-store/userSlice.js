import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk('loginuser' , async(userCredentialsObj ,thunkAPI) => {
    // make post
    let data;
    let response = await axios.post('users/userlogin', userCredentialsObj)
    data = response.data;
    console.log("daatata",data)

    if(data.message === "Login success")
    {
        //save it in localstorage
        // localStorage.message
        localStorage.setItem("token",data.token)
        return data.user;
    }
    if(data.message === 'Invalid username' || data.message === 'Invalid password')
    {
        //it will provide data to rejected state
        return thunkAPI.rejectWithValue(data)
    }
}) 

const userSlice = createSlice({
    name : 'user',
    initialState: {
        userObj: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        invalidLoginMessage: ''
    },
    reducers:{
        clearUserLoginStatus: (state) => {
            state.isSuccess = false;
            state.userObj = {}
            return state;
        }
    },
    extraReducers: {
        [userLogin.fulfilled] : (state,action) => {
            state.userObj = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.invalidLoginMessage = ''
        },
        [userLogin.pending]: (state) => {
            state.isLoading = true;
        },
        [userLogin.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        }
    }
})

export const {clearUserLoginStatus} = userSlice.actions
export default userSlice.reducer