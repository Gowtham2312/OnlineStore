import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk('loginadmin' , async(adminCredentialsObj ,thunkAPI) => {
    // make post
    let data;
    let response = await axios.post('admin/adminlogin', adminCredentialsObj)
    data = response.data;
    
    console.log("daaa admin",data)

    if(data.message === "Login success")
    {
        //save it in localstorage
        // localStorage.message
        localStorage.setItem("token",data.token)
        return data.admin;
    }
    if(data.message === 'Invalid adminname' || data.message === 'Invalid password')
    {
        //it will provide data to rejected state
        return thunkAPI.rejectWithValue(data)
    }
}) 

const adminSlice = createSlice({
    name : 'admin',
    initialState: {
        adminObj: {},
        Success: false,
        isLoading: false,
        isError: false,
        invalidLoginMessage: ''
    },
    reducers:{
        clearAdminLoginStatus: (state) => {
            state.Success = false;
            state.adminObj = {}
            return state;
        }
    },
    extraReducers: {
        [adminLogin.fulfilled] : (state,action) => {
            state.adminObj = action.payload;
            state.Success = true;
            state.isLoading = false;
            state.isError = false;
            state.invalidLoginMessage = ''
        },
        [adminLogin.pending]: (state) => {
            state.isLoading = true;
        },
        [adminLogin.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        }
    }
})

export const {clearAdminLoginStatus} = adminSlice.actions
export default adminSlice.reducer