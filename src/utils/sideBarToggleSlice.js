import { createSlice } from "@reduxjs/toolkit";

const sideBarToggleSlice = createSlice({
    name:"sidebarToggle",
    initialState:{toggle:true},
    reducers:{
        toggleSideBar(state){
            state.toggle = !state.toggle
        }
    }
})

export const {toggleSideBar} = sideBarToggleSlice.actions

export default sideBarToggleSlice.reducer