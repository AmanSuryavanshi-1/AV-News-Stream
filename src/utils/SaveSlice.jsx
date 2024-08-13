import { createSlice } from "@reduxjs/toolkit";

const saveSlice = createSlice({
    name: "save",
    initialState: {
        savedArticles: [],
    },
    reducers:{
        addArticle: (state, action) => {
            // Check if the article is already saved to avoid duplicates
            const isArticleAlreadySaved = state.savedArticles.some(
                article => article.title === action.payload.title
            );
            if (!isArticleAlreadySaved) {
                state.savedArticles.push(action.payload);
            }
        },
        removeArticle: (state, action) =>{
            state.savedArticles = state.savedArticles.filter(
                article => article.title !== action.payload.title
            );
        },
        clearArticles: (state) =>{
            state.savedArticles = [];
        }
    }
}) 

export const { addArticle, removeArticle, clearArticles } = saveSlice.actions;
export default saveSlice.reducer