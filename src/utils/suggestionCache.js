import { createSlice } from "@reduxjs/toolkit";

const suggestionCacheSlice = createSlice({
    name:"suggestionCacheSlice"  , 
    initialState:{},
    reducers:{
        searchCache(state , action){
            state=Object.assign(state , action.payload)
        }
    }
})

export const {searchCache} = suggestionCacheSlice.actions

export default suggestionCacheSlice.reducer