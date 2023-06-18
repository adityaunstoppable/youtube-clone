import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchString:"",
    searchResultFromThisString:""
}

const searchSlice = createSlice({
    name:"searchString",
    initialState,
    reducers:{
        setString(state , action){
            state.searchString = action.payload
        },
        setSearchStringAction(state , action){
            state.searchResultFromThisString = action.payload
        }
    }
})

export const {setString,setSearchStringAction} = searchSlice.actions

export default searchSlice.reducer