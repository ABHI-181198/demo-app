import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {  IAddUserState } from '.'
import error from '../../utils/error';
import axios from 'axios';


const initialState: IAddUserState = {
  success:false,
  message:"",
  loading:"loading",
  data:undefined,
};

export const AddUserThunk=createAsyncThunk(
  "AddingUser",
  async(data:any)=>{
    try{
      const response=await 
      axios
      .post("https://localhost/7004/api/EmployeeMasters", data)
      .then((response) => {
        console.log("Api Response",response);
        return response;
      });
      return response;
    }
    catch(error_){
      console.log(error_);
      throw new Error(error(error_));
    }
  }
)

export const slice = createSlice({
  name: "Accounting/AddingUser",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    // Investment
    builder.addCase(AddUserThunk.pending, (state) => {
      state.loading = "loading";
      //   state.error = undefined;
    });
    builder.addCase(AddUserThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log("api response",action.payload);
      state.data=action.payload;
    });
    builder.addCase(AddUserThunk.rejected, (state) => {
      state.loading = "failed";
      //   // action.payload contains error information
      //   state.error = error(action.payload);
    });
  },
});

export default slice.reducer;