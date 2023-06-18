import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import sideBarToggleSlice from "./sideBarToggleSlice";

const store = configureStore({
  reducer: { search: searchSlice , toggleSideBar: sideBarToggleSlice},
});

export default store;
