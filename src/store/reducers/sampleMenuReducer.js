/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// export const get_sellerPackages_webSiteOrigin = createAsyncThunk(
//     'home/get_sellerPackages_webSiteOrigin',
//     //'sellerPackage/get_sellerPackages_webSiteOrigin',
//     async(webSiteOrigin, { fulfillWithValue }) => {
//         //console.log(webSiteOrigin)
//         try {
//             const {data} = await api.get(`/get-sellerPackages-webSiteOrigin/${encodeURIComponent(webSiteOrigin)}`)
//             //console.log('get_sellerPackages_webSiteOrigin ', data)
//             return fulfillWithValue(data)
//         } catch (error) {
//             console.log(error.response.data)
//             //return rejectWithValue(error.response.data)
//         }
//     }
// );
//end method

export const sampleMenu_webSiteOrigin_get = createAsyncThunk(
    'sampleMenu/sampleMenu_webSiteOrigin_get',
    async(webSiteOrigin,{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/sampleMenu-webSiteOrigin-get/${encodeURIComponent(webSiteOrigin)}`)
            // sampleMenu-webSiteOrigin-get
            // const {data} = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true})
            // const {data} = await api.get(`/sampleMenu-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true})
            // console.log(webSiteOrigin)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
    //         //console.log(error.response.data)
    //         return rejectWithValue(error.response.data)
        }
    }
);
//end method

export const sampleMenuReducer = createSlice({
    name: 'sampleMenu',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        sampleMenus : [],
        totalSampleMenu: 0
    },
    reducers : {
        messageClear : (state,_) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers : (builder) => {
        builder
        // .addCase(sampleMenu_add.pending, (state, { payload }) => {
        //     state.loader = true;
        // })
        // .addCase(sampleMenu_add.rejected, (state, { payload }) => {
        //     state.loader = false;
        //     // state.errorMessage = payload.error
        // }) 
        // .addCase(sampleMenu_add.fulfilled, (state, { payload }) => {
        //     state.loader = false;
        //     state.successMessage = payload.message
        //     state.sampleMenus = [...state.sampleMenus, payload.sampleMenu]
        // })
        .addCase(sampleMenu_webSiteOrigin_get.fulfilled, (state, { payload }) => {
            state.totalSampleMenu = payload.totalSampleMenu;
            state.sampleMenus = payload.sampleMenus;
        })
        // .addCase(updateCategory.fulfilled, (state, { payload }) => {
        //     state.loader = false;
        //     state.successMessage = payload.message 
        //     const index = state.categorys.findIndex((cat) => cat._id === payload.category._id);
        //     if (index !== -1) {
        //         state.categorys[index] = payload.category;
        //     }
        // })
        // .addCase(updateCategory.rejected, (state, { payload }) => {
        //     state.loader = false;
        //     state.errorMessage = payload.error; 
        // })
        // .addCase(deleteCategory.fulfilled, (state, action) => {
        //     state.categorys = state.categorys.filter(cat => cat._id !== action.meta.arg);
        //     state.successMessage = action.payload.message; 
        // })
        // .addCase(deleteCategory.rejected, (state,action) => { 
        //     state.errorMessage = action.payload; 
        // })
    }
})

export const {messageClear} = sampleMenuReducer.actions
export default sampleMenuReducer.reducer



