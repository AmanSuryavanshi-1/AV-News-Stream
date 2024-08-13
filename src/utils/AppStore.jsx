import { configureStore } from "@reduxjs/toolkit"
import SaveSliceReducer from "./SaveSlice";

const appStore = configureStore({
 reducer: {
    save: SaveSliceReducer,
 }
})

export default appStore;