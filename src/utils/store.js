import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import sideBarToggleSlice from "./sideBarToggleSlice";
import suggestionCacheSlice from "./suggestionCache";

const store = configureStore({
  reducer: { search: searchSlice , toggleSideBar: sideBarToggleSlice , suggestionCache:suggestionCacheSlice},
});

export default store;
