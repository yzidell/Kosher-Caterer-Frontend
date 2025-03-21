/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_category = createAsyncThunk(
    'product/get_category',
    async(webSiteOrigin, { fulfillWithValue, rejectWithValue }) => {
        try {
            //const {data} = await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true}) 
            //const {data} = await api.get('/home/get-categorys')
            const {data} = await api.get(`/home/get-categorys?webSiteOrigin=${encodeURIComponent(webSiteOrigin)}`)
            //console.log('homeReducer /home/get-categorys')
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method

export const get_mainIngredient = createAsyncThunk(
    'product/get_mainIngredient',
    async(webSiteOrigin,{ fulfillWithValue, rejectWithValue }) => {
        try {
            //const {data} = await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true}) 
            //const {data} = await api.get('home/get-mainIngredients')
            const {data} = await api.get(`home/get-mainIngredients?webSiteOrigin=${encodeURIComponent(webSiteOrigin)}`)
            //console.log('homeReducer /home/get-mainIngredients')
            //console.log(data) //works
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
);
// End Method

export const get_products = createAsyncThunk(
    'product/get_products',
    async(webSiteOrigin, { fulfillWithValue, rejectWithValue }) => {
        try {
            //const {data} = await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true}) 
            //const {data} = await api.get('/home/get-products')
            const {data} = await api.get(`/home/get-products?webSiteOrigin=${encodeURIComponent(webSiteOrigin)}`)
           //console.log('homeReducer get_products ', data)
            //console.log('homeReducer /home/get-mainIngredients')
            //console.log(webSiteOrigin) //works
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
// End Method 

// export const get_all_products = createAsyncThunk(
//     'product/get_products',
//     async(webSiteOrigin, { fulfillWithValue }) => {
//         try {
//             //const {data} = await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true}) 
//             //const {data} = await api.get('/home/get-products')
//             const {data} = await api.get(`/home/get-all-products?webSiteOrigin=${encodeURIComponent(webSiteOrigin)}`)
//             //console.log('homeReducer get_products ', data)
//             //console.log('homeReducer /home/get-mainIngredients')
//             //console.log(webSiteOrigin) //works
//             return fulfillWithValue(data)
//         } catch (error) {
//             console.log(error.respone)
//         }
//     }
// )
// End Method 


//price_range_product
export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async(webSiteOrigin, { fulfillWithValue, rejectWithValue }) => { 
        // from shops page useEffect(() => { dispatch(price_range_product(webSiteOrigin))
        try {
            //const {data} = await api.get(`/home/price-range-latest-product`) ///${webSiteOrigin}
            //const {data} = await api.get(`/home/price-range-latest-product/${encodeURIComponent(webSiteOrigin)}`) ///${webSiteOrigin}
            const {data} = await api.get(`/home/price-range-latest-product?webSiteOrigin=${encodeURIComponent(webSiteOrigin)}`)
            //console.log(data) //?webSiteOrigin=${webSiteOrigin}
            //console.log(encodeURIComponent(webSiteOrigin))//works
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
// End Method

export const query_products = createAsyncThunk(
    'product/query_products',
    async(query, { fulfillWithValue, rejectWithValue }) => {
        //console.log(query)
        try {
            //const {data} = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber} `)
            //KEEP THIS ON ONE LINE!!
            const {data} = await api.get(`/home/query-products?webSiteOrigin=${query.webSiteOrigin}&&isVisible=Show&&category=${query.category}&&mainIngredient=${query.mainIngredient}&&FMP=${query.FMP}&&cookingMethod=${query.cookingMethod}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''} `)
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const get_product_details = createAsyncThunk(
    'product/get_product_details',
    async(slug, { fulfillWithValue, rejectWithValue }) => {
        //async({productId}, { fulfillWithValue }) => {
        //console.log('slug ', slug)//, 'slug ', slug
        try {
            const {data} = await api.get(`/home/get-product-details/${slug}`)
            //console.log('slug ', slug)//, 'slug ', slug
            //const {data} = await api.get(`/home/get-product-details/${productId}`) // /${slug}
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const get_product_deposit_details = createAsyncThunk(
    'product/get_product_deposit_details',
    async(webSiteOrigin, { fulfillWithValue, rejectWithValue }) => {
        //console.log(webSiteOrigin)     
        // from shops page useEffect(() => { dispatch(price_range_product(webSiteOrigin))
        //try {
        //         //const {data} = await api.get(`/home/price-range-latest-product`) ///${webSiteOrigin}
        //         //const {data} = await api.get(`/home/price-range-latest-product/${encodeURIComponent(webSiteOrigin)}`) ///${webSiteOrigin}
        //         const {data} = await api.get(`/home/price-range-latest-product?webSiteOrigin=${encodeURIComponent(webSiteOrigin)}`)
       

            //     async(slug, { fulfillWithValue }) => {
            //     //async({productId}, { fulfillWithValue }) => {
            //         //console.log('slug ', slug)//, 'slug ', slug
        try {
            const {data} = await api.get(`/home/get-product-deposit-details/${encodeURIComponent(webSiteOrigin)}`)
                //             //console.log('slug ', slug)//, 'slug ', slug
                                ////const {data} = await api.get(`/home/price-range-latest-product/${encodeURIComponent(webSiteOrigin)}`) ///${webSiteOrigin}
                //         
                //             //const {data} = await api.get(`/home/get-product-details/${productId}`) // /${slug}
                //             //console.log(data)
                return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async(info, { fulfillWithValue, rejectWithValue }) => {
        //console.log(info)
        try {
            const {data} = await api.post('/home/customer/submit-review', info)
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async({productId, pageNumber}, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {data} = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
// End Method        

export const get_banners = createAsyncThunk(
    'banner/get_banners',
    async(webSiteOrigin, { fulfillWithValue, rejectWithValue }) => {
        //console.log('get_banners ', webSiteOrigin)
        try {
            const {data} = await api.get(`/get-banners/${encodeURIComponent(webSiteOrigin)}`)
            //console.log('get_banners ', data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const homeReducer = createSlice({
    name: 'home',
    initialState:{
        categorys : [],
        mainIngredients: [],
        products : [],
        totalProduct : 0,
        parPage: 3,
        latest_product : [],
        topRated_product : [],
        discount_product : [],
        featured_product: [],
        priceRange : {
            low : 0,
            high: 100
        },
        allSiteProducts: [],
        product: {},
        relatedProducts: [],
        moreProducts: [],
        errorMessage : '',
        successMessage: '',
        totalReviews: 0,
        rating_review: [],
        reviews : [],
        banners: [] 
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_category.fulfilled, (state, { payload }) => {
            state.categorys = payload.categorys;
        })
        .addCase(get_mainIngredient.fulfilled, (state, { payload }) => {
            state.mainIngredients = payload.mainIngredients;
        })
        .addCase(get_products.fulfilled, (state, { payload }) => {
            state.products = payload.products; 
            state.latest_product = payload.latest_product;
            state.topRated_product = payload.topRated_product;
            state.discount_product = payload.discount_product;
            state.featured_product = payload.featured_product;
        })
        .addCase(price_range_product.fulfilled, (state, { payload }) => {
            state.latest_product = payload.latest_product;
            state.priceRange = payload.priceRange;
        })
        .addCase(query_products.fulfilled, (state, { payload }) => { 
            state.products = payload.products;
            state.totalProduct = payload.totalProduct;
            state.parPage = payload.parPage; 
            state.allSiteProducts = payload.allSiteProducts;
            //state.featured_product = payload.featured_product;
        })
        .addCase(get_product_details.fulfilled, (state, { payload }) => { 
            state.product = payload.product;
            state.relatedProducts = payload.relatedProducts;
            state.moreProducts = payload.moreProducts; 
        })
        .addCase(get_product_deposit_details.fulfilled, (state, { payload }) => { 
            state.product = payload.product
        })
        .addCase(customer_review.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
        })
        .addCase(get_reviews.fulfilled, (state, { payload }) => {
            state.reviews = payload.reviews;
            state.totalReviews = payload.totalReviews;
            state.rating_review = payload.rating_review;
        })
        .addCase(get_banners.fulfilled, (state, { payload }) => {
            state.banners = payload.banners; 
        })
    }
})

export const {messageClear} = homeReducer.actions
export default homeReducer.reducer
