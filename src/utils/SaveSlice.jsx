import { createSlice } from "@reduxjs/toolkit";

const saveSlice = createSlice({
    name: "save",
    initialState: {
        savedArticles: [],
    },
    reducers:{
        addArticle: (state, action) => {
            state.savedArticles.push(action.payload);
        },
        removeArticle: (state, action) =>{
            state.savedArticles.splice(action.payload, 1);
        },
        clearArticles: (state) =>{
            state.savedArticles = [];
        }
    }
}) 

export const { addArticle, removeArticle, clearArticles } = saveSlice.actions;
export default saveSlice.reducer