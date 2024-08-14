import { createSlice } from "@reduxjs/toolkit";

const saveSlice = createSlice({
    name: "save",
    initialState: {
        savedArticles: [],
        savedVideos: [],
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
        addVideoArticle: (state, action) => {
            // Check if the video is already saved to avoid duplicates
            const isVideoAlreadySaved = state.savedVideos.some(
                video => video.etag === action.payload.etag
            );
            if (!isVideoAlreadySaved) {
                state.savedVideos.push(action.payload);
            }
        },
        removeVideoArticle: (state, action) =>{
            state.savedVideos = state.savedVideos.filter(
                video => video.etag !== action.payload.etag
            );
        },  
        clearArticles: (state) =>{
            state.savedArticles = [];
            state.savedVideos=[];
        }
    }
}) 

export const { addArticle, removeArticle, clearArticles, addVideoArticle, removeVideoArticle } = saveSlice.actions;
export default saveSlice.reducer